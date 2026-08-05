"use client";

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/components/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function AuthForm() {
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
      setMessage({ type: "error", text: "Supabase-ключі ще не доступні в цьому середовищі. Гостьова гра працює без входу." });
      return;
    }
    if (mode === "signup" && !accepted) {
      setMessage({ type: "error", text: "Підтвердь, що тобі виповнилося 18 років." });
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
      setMessage({ type: "success", text: "Акаунт створено. Перевір пошту, якщо підтвердження email увімкнене в Supabase." });
    }
    setSubmitting(false);
  }

  return (
    <section className="auth-panel">
      <span className="eyebrow"><Sparkles size={15} /> Club access</span>
      <h1>{mode === "login" ? "Раді бачити знову" : "Приєднуйся до CASTA"}</h1>
      <p>{mode === "login" ? "Увійди, щоб продовжити свою серію та синхронізувати колекцію." : "Створи безкоштовний акаунт і збережи прогрес між пристроями."}</p>

      <div className="auth-tabs">
        <button type="button" className={mode === "login" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("login")}>Вхід</button>
        <button type="button" className={mode === "signup" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("signup")}>Реєстрація</button>
      </div>

      <form className="auth-form" onSubmit={submit}>
        {mode === "signup" && (
          <div className="field">
            <label htmlFor="username">Ім’я в клубі</label>
            <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Наприклад, WildFox" maxLength={30} />
          </div>
        )}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Щонайменше 6 символів" />
        </div>
        {mode === "signup" && (
          <label className="consent-row">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
            <span>Мені виповнилося 18 років. Я розумію, що CASTA не пропонує ставки або виграші в реальних грошах.</span>
          </label>
        )}
        {message && <p className={`form-message ${message.type}`} role="status">{message.text}</p>}
        {!configured && !message && <p className="form-message">У локальному демо можна грати без входу. На Vercel форма активується після підстановки Supabase-змінних.</p>}
        <button type="submit" className="button button-primary" disabled={submitting}>
          {submitting ? "Зачекай…" : mode === "login" ? "Увійти" : "Створити акаунт"}
          {!submitting && <ArrowRight size={18} />}
        </button>
      </form>
    </section>
  );
}

export function AuthAside() {
  return (
    <aside className="auth-aside">
      <CheckCircle2 size={32} color="var(--lime)" />
      <h2>Твій прогрес.<br />Твоя колекція.<br />Твоя CASTA.</h2>
      <p>Один акаунт зберігає баланс, серії, досягнення та косметичні предмети. Реальні гроші тут не використовуються.</p>
    </aside>
  );
}
