"use client";

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function AuthForm() {
  const { locale } = useI18n();
  const t = {
    en: { access: "Club access", loginTitle: "Welcome back", signupTitle: "Join CASTA", loginLead: "Sign in to continue your streak and sync your collection.", signupLead: "Create a free account and keep your progress across devices.", login: "Sign in", signup: "Register", name: "Club name", example: "For example, WildFox", password: "Password", passwordHint: "At least 6 characters", consent: "I am 18 or older. I understand that CASTA does not offer real-money betting or winnings.", wait: "Please wait…", create: "Create account", missing: "Supabase keys are not available in this environment yet. Guest play works without signing in.", age: "Confirm that you are at least 18 years old.", success: "Account created. Check your inbox if email confirmation is enabled in Supabase.", demo: "You can play the local demo as a guest. On Vercel, this form activates when the Supabase variables are configured." },
    cs: { access: "Vstup do klubu", loginTitle: "Vítej zpět", signupTitle: "Přidej se ke CASTA", loginLead: "Přihlas se, pokračuj v sérii a synchronizuj svou sbírku.", signupLead: "Vytvoř si bezplatný účet a uchovej pokrok na všech zařízeních.", login: "Přihlásit se", signup: "Registrace", name: "Jméno v klubu", example: "Například WildFox", password: "Heslo", passwordHint: "Alespoň 6 znaků", consent: "Je mi 18 let nebo více. Rozumím, že CASTA nenabízí sázky ani výhry za skutečné peníze.", wait: "Počkej prosím…", create: "Vytvořit účet", missing: "Klíče Supabase zatím nejsou v tomto prostředí dostupné. Režim hosta funguje bez přihlášení.", age: "Potvrď, že ti je alespoň 18 let.", success: "Účet byl vytvořen. Pokud je v Supabase zapnuté potvrzení e-mailu, zkontroluj svou schránku.", demo: "Místní demo můžeš hrát jako host. Na Vercelu se formulář aktivuje po nastavení proměnných Supabase." },
  }[locale];
  const router = useRouter();
  const { configured } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage({ type: "error", text: t.missing });
      return;
    }
    if (mode === "signup" && !accepted) {
      setMessage({ type: "error", text: t.age });
      return;
    }

    setSubmitting(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ type: "error", text: error.message });
        setSubmitting(false);
        return;
      }
      router.push("/profile");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username.trim() || email.split("@")[0] },
        emailRedirectTo: `${window.location.origin}/profile`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: t.success });
    }
    setSubmitting(false);
  }

  return (
    <section className="auth-panel">
      <span className="eyebrow"><Sparkles size={15} /> {t.access}</span>
      <h1>{mode === "login" ? t.loginTitle : t.signupTitle}</h1>
      <p>{mode === "login" ? t.loginLead : t.signupLead}</p>

      <div className="auth-tabs">
        <button type="button" className={mode === "login" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("login")}>{t.login}</button>
        <button type="button" className={mode === "signup" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("signup")}>{t.signup}</button>
      </div>

      <form className="auth-form" onSubmit={submit}>
        {mode === "signup" && (
          <div className="field">
            <label htmlFor="username">{t.name}</label>
            <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder={t.example} maxLength={30} />
          </div>
        )}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="password">{t.password}</label>
          <input id="password" type="password" required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.passwordHint} />
        </div>
        {mode === "signup" && (
          <label className="consent-row">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
            <span>{t.consent}</span>
          </label>
        )}
        {message && <p className={`form-message ${message.type}`} role="status">{message.text}</p>}
        {!configured && !message && <p className="form-message">{t.demo}</p>}
        <button type="submit" className="button button-primary" disabled={submitting}>
          {submitting ? t.wait : mode === "login" ? t.login : t.create}
          {!submitting && <ArrowRight size={18} />}
        </button>
      </form>
    </section>
  );
}

export function AuthAside() {
  const { locale } = useI18n();
  const t = locale === "cs"
    ? { title: <>Tvůj pokrok.<br />Tvoje sbírka.<br />Tvoje CASTA.</>, text: "Jeden účet uchová zůstatek, série, úspěchy i kosmetické předměty. Skutečné peníze se zde nepoužívají." }
    : { title: <>Your progress.<br />Your collection.<br />Your CASTA.</>, text: "One account keeps your balance, streaks, achievements and cosmetic items. Real money is never used here." };
  return (
    <aside className="auth-aside">
      <CheckCircle2 size={32} color="var(--lime)" />
      <h2>{t.title}</h2>
      <p>{t.text}</p>
    </aside>
  );
}
