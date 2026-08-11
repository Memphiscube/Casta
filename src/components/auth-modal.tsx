"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import { AuthForm } from "@/components/auth-form";
import { useI18n } from "@/components/i18n-provider";

type AuthModalProps = {
  mode: "login" | "signup";
  open: boolean;
  onClose: () => void;
};

export function AuthModal({ mode, open, onClose }: AuthModalProps) {
  const { locale } = useI18n();
  const closeLabel = locale === "cs" ? "Zavřít přihlášení" : "Close sign-in";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="auth-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="auth-modal-card" role="dialog" aria-modal="true" aria-label={mode === "login" ? "CASTA sign in" : "CASTA registration"}>
        <div className="auth-modal-head">
          <Image src="/logo.png" alt="CASTA" width={911} height={236} />
          <button type="button" onClick={onClose} aria-label={closeLabel}><X size={22} /></button>
        </div>
        <AuthForm key={mode} initialMode={mode} presentation="modal" onAuthenticated={onClose} />
      </div>
    </div>
  );
}
