"use client";

import { ArrowRight, Coins, Gift, LogOut, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";

export function AccountPopover({ onClose }: { onClose: () => void }) {
  const { user, profile, signOut } = useAuth();
  const { locale, numberLocale } = useI18n();
  const copy = locale === "cs"
    ? { profile: "Můj profil", balance: "Zůstatek virtuálních mincí", level: "Úroveň", streak: "Denní série", rewards: "Denní odměny", open: "Otevřít profil", logout: "Odhlásit se" }
    : { profile: "My profile", balance: "Virtual coin balance", level: "Level", streak: "Daily streak", rewards: "Daily rewards", open: "Open profile", logout: "Sign out" };

  if (!user) return null;

  return (
    <div className="account-popover" role="dialog" aria-label={copy.profile}>
      <div className="account-popover-user">
        <span><UserRound size={25} /></span>
        <div><strong>{profile.username}</strong><small>{user.email}</small></div>
      </div>
      <div className="account-popover-balance">
        <Coins size={25} /><div><strong>{profile.balance.toLocaleString(numberLocale)}</strong><small>{copy.balance}</small></div>
      </div>
      <div className="account-popover-stats">
        <span><Sparkles size={16} /><small>{copy.level}</small><strong>{profile.level}</strong></span>
        <span><Gift size={16} /><small>{copy.streak}</small><strong>{profile.streak}</strong></span>
      </div>
      <Link href="/rewards" onClick={onClose}><Gift size={18} /><span>{copy.rewards}</span><ArrowRight size={16} /></Link>
      <Link href="/profile" onClick={onClose}><UserRound size={18} /><span>{copy.open}</span><ArrowRight size={16} /></Link>
      <button type="button" className="account-popover-logout" onClick={() => { void signOut(); onClose(); }}><LogOut size={18} />{copy.logout}</button>
    </div>
  );
}
