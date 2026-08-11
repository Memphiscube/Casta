"use client";

import { ArrowRight, CheckCircle2, Eye, EyeOff, Gift, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type AuthFormProps = {
  initialMode?: "login" | "signup";
  presentation?: "page" | "modal";
  onAuthenticated?: () => void;
};

function GoogleMark() {
  return (
    <svg className="google-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.38l-3.24-2.53c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.61A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.92A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.92V7.47H3.04A10 10 0 0 0 2 12c0 1.63.39 3.17 1.04 4.53l3.35-2.61Z" />
      <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.47l3.35 2.61C7.18 7.71 9.39 5.95 12 5.95Z" />
    </svg>
  );
}

export function AuthForm({ initialMode = "login", presentation = "page", onAuthenticated }: AuthFormProps = {}) {
  const { locale } = useI18n();
  const t = {
    en: { access: "Club access", loginTitle: "Welcome back", signupTitle: "Join CASTA", loginLead: "Sign in to continue your streak and sync your collection.", signupLead: "Create a free account and keep your progress across devices.", login: "Sign in", signup: "Register", name: "Club name", example: "For example, WildFox", password: "Password", passwordHint: "At least 6 characters", show: "Show", hide: "Hide", consentStart: "I am 18 or older and agree to the", terms: "Terms", and: "and", privacy: "Privacy Policy", wait: "Please wait…", create: "Claim 5,000 coins & play", missing: "Supabase keys are not available in this environment yet. Guest play works without signing in.", age: "Confirm that you are at least 18 years old and accept the legal terms.", success: "Account created. Check your inbox if email confirmation is enabled in Supabase.", demo: "You can play the local demo as a guest. On Vercel, this form activates when the Supabase variables are configured.", welcome: "Welcome package", starter: "5,000 virtual coins", starterNote: "Instant · no deposit required", or: "or", googleLogin: "Continue with Google", googleSignup: "Sign up with Google", googleError: "Google sign-in could not start. Please try again." },
    cs: { access: "Vstup do klubu", loginTitle: "Vítej zpět", signupTitle: "Přidej se ke CASTA", loginLead: "Přihlas se, pokračuj v sérii a synchronizuj svou sbírku.", signupLead: "Vytvoř si bezplatný účet a uchovej pokrok na všech zařízeních.", login: "Přihlásit se", signup: "Registrace", name: "Jméno v klubu", example: "Například WildFox", password: "Heslo", passwordHint: "Alespoň 6 znaků", show: "Zobrazit", hide: "Skrýt", consentStart: "Je mi 18 let nebo více a souhlasím s", terms: "Podmínkami", and: "a", privacy: "Zásadami ochrany soukromí", wait: "Počkej prosím…", create: "Získat 5 000 mincí a hrát", missing: "Klíče Supabase zatím nejsou v tomto prostředí dostupné. Režim hosta funguje bez přihlášení.", age: "Potvrď, že ti je alespoň 18 let, a přijmi právní podmínky.", success: "Účet byl vytvořen. Pokud je v Supabase zapnuté potvrzení e-mailu, zkontroluj svou schránku.", demo: "Místní demo můžeš hrát jako host. Na Vercelu se formulář aktivuje po nastavení proměnných Supabase.", welcome: "Uvítací balíček", starter: "5 000 virtuálních mincí", starterNote: "Ihned · bez nutnosti vkladu", or: "nebo", googleLogin: "Pokračovat přes Google", googleSignup: "Registrovat se přes Google", googleError: "Přihlášení přes Google se nepodařilo spustit. Zkus to znovu." },
  }[locale];
  const router = useRouter();
  const { configured } = useAuth();
  const fieldId = useId();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      onAuthenticated?.();
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

  function continueWithGoogle() {
    setMessage(null);
    if (mode === "signup" && !accepted) {
      setMessage({ type: "error", text: t.age });
      return;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      setMessage({ type: "error", text: t.missing });
      return;
    }

    setSubmitting(true);
    const authorizeUrl = new URL("/auth/v1/authorize", supabaseUrl);
    authorizeUrl.searchParams.set("provider", "google");
    authorizeUrl.searchParams.set("redirect_to", `${window.location.origin}/profile`);
    window.location.assign(authorizeUrl.toString());
  }

  return (
    <section className={`auth-panel ${presentation === "modal" ? "auth-panel-modal" : ""}`}>
      <span className="eyebrow"><Sparkles size={15} /> {t.access}</span>
      <h1>{mode === "login" ? t.loginTitle : t.signupTitle}</h1>
      <p>{mode === "login" ? t.loginLead : t.signupLead}</p>

      <div className="auth-tabs">
        <button type="button" className={mode === "login" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("login")}>{t.login}</button>
        <button type="button" className={mode === "signup" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("signup")}>{t.signup}</button>
      </div>

      <div className="auth-welcome-pack" aria-label={t.welcome}>
        <Image src="/games/jungle-wheel-coins.png" alt="" width={86} height={86} />
        <span><small><Gift size={13} /> {t.welcome}</small><strong>{t.starter}</strong><em>{t.starterNote}</em></span>
      </div>

      <form className="auth-form" onSubmit={submit}>
        {mode === "signup" && (
          <div className="field">
            <label htmlFor={`${fieldId}-username`}>{t.name}</label>
            <input id={`${fieldId}-username`} value={username} onChange={(event) => setUsername(event.target.value)} placeholder={t.example} maxLength={30} />
          </div>
        )}
        <div className="field">
          <label htmlFor={`${fieldId}-email`}>Email</label>
          <input id={`${fieldId}-email`} type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor={`${fieldId}-password`}>{t.password}</label>
          <div className="password-field">
            <input id={`${fieldId}-password`} type={showPassword ? "text" : "password"} required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.passwordHint} />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? t.hide : t.show}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}<span>{showPassword ? t.hide : t.show}</span>
            </button>
          </div>
        </div>
        {mode === "signup" && (
          <label className="consent-row">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
            <span>{t.consentStart} <Link href="/terms">{t.terms}</Link> {t.and} <Link href="/privacy">{t.privacy}</Link>.</span>
          </label>
        )}
        {message && <p className={`form-message ${message.type}`} role="status">{message.text}</p>}
        {!configured && !message && <p className="form-message">{t.demo}</p>}
        <button type="submit" className="button button-primary" disabled={submitting}>
          {submitting ? t.wait : mode === "login" ? t.login : t.create}
          {!submitting && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="auth-divider"><span>{t.or}</span></div>
      <button type="button" className="google-auth-button" disabled={submitting} onClick={continueWithGoogle}>
        <GoogleMark />
        {mode === "login" ? t.googleLogin : t.googleSignup}
      </button>
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
