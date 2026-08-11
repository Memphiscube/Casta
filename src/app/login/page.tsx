import type { Metadata } from "next";

import { AuthAside, AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or create a free CASTA account.",
};

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="site-container auth-layout">
        <AuthForm />
        <AuthAside />
      </div>
    </div>
  );
}
