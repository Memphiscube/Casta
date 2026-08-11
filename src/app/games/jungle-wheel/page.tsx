"use client";

import { ArrowLeft, CircleDollarSign, Clock3, Coins, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { JungleWheel } from "@/components/jungle-wheel";
import { useI18n } from "@/components/i18n-provider";

const copy = {
  en: { back: "Back to games", guest: "Guest mode available", how: "How it works", bet: "Choose a bet from 50 to 500 virtual coins.", time: "Each spin takes a few seconds and updates your balance immediately.", server: "For signed-in players, Supabase processes the result and balance securely on the server.", notice: "This is a social casino. Coins cannot be bought with real money or exchanged for cash or prizes." },
  cs: { back: "Zpět ke hrám", guest: "Režim hosta je dostupný", how: "Jak to funguje", bet: "Vyber sázku od 50 do 500 virtuálních mincí.", time: "Každé roztočení trvá několik sekund a ihned aktualizuje zůstatek.", server: "U přihlášených hráčů zpracovává výsledek a zůstatek bezpečně server Supabase.", notice: "Toto je social casino. Mince nelze koupit za skutečné peníze ani směnit za hotovost či ceny." },
} as const;

export default function JungleWheelPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  return (
    <div className="page-shell compact jungle-game-page">
      <div className="site-container">
        <div className="game-page-head">
          <Link href="/games" className="back-link"><ArrowLeft size={17} /> {t.back}</Link>
          <span className="game-mode-pill">{t.guest}</span>
        </div>

        <div className="wheel-layout">
          <JungleWheel />
          <aside className="side-panel">
            <span className="eyebrow">Jungle Wheel</span>
            <h2>{t.how}</h2>
            <div className="rules-list">
              <div className="rule-item">
                <span className="rule-icon"><Coins size={17} /></span>
                <span>{t.bet}</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><Clock3 size={17} /></span>
                <span>{t.time}</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><ShieldCheck size={17} /></span>
                <span>{t.server}</span>
              </div>
            </div>
            <div className="side-divider" />
            <div className="notice-card">
              <CircleDollarSign size={19} />
              <span>{t.notice}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
