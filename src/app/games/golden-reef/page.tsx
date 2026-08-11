"use client";

import { ArrowLeft, CircleDollarSign, Coins, Grid3X3, ShieldCheck, Trophy, Waves } from "lucide-react";
import Link from "next/link";

import { GoldenReefSlots } from "@/components/golden-reef-slots";
import { useI18n } from "@/components/i18n-provider";

const copy = {
  en: {
    back: "Back to games", guest: "Guest mode available", how: "How to play",
    grid: "The 5×3 reef uses 8 fixed winning lines.", match: "Match 3 to 5 identical sea treasures in a row, starting from the left.",
    balance: "Your bet and winnings update the shared profile balance immediately.", server: "For signed-in players, Supabase processes the result and wallet on the server.",
    best: "Legendary treasure", multiplier: "×25 of your bet on one line", notice: "This is a social casino. There are no real-money bets, coin purchases or cash prizes.",
  },
  cs: {
    back: "Zpět ke hrám", guest: "Režim hosta je dostupný", how: "Jak hrát",
    grid: "Útes 5×3 používá 8 pevných výherních linií.", match: "Spoj 3 až 5 stejných mořských pokladů v řadě, počínaje zleva.",
    balance: "Sázka a výhra ihned aktualizují společný zůstatek profilu.", server: "U přihlášených hráčů zpracovává výsledek a peněženku server Supabase.",
    best: "Legendární poklad", multiplier: "×25 sázky na jedné linii", notice: "Toto je social casino. Nejsou zde sázky za skutečné peníze, nákup mincí ani peněžní výhry.",
  },
} as const;

export default function GoldenReefPage() {
  const { locale } = useI18n();
  const t = copy[locale];

  return (
    <div className="page-shell compact golden-reef-page">
      <div className="site-container">
        <div className="game-page-head">
          <Link href="/games" className="back-link"><ArrowLeft size={17} /> {t.back}</Link>
          <span className="game-mode-pill">{t.guest}</span>
        </div>

        <div className="wheel-layout cherry-layout">
          <GoldenReefSlots />
          <aside className="side-panel reef-side-panel">
            <span className="eyebrow"><Waves size={15} /> Golden Reef</span>
            <h2>{t.how}</h2>
            <div className="rules-list">
              <div className="rule-item"><span className="rule-icon"><Grid3X3 size={17} /></span><span>{t.grid}</span></div>
              <div className="rule-item"><span className="rule-icon"><Trophy size={17} /></span><span>{t.match}</span></div>
              <div className="rule-item"><span className="rule-icon"><Coins size={17} /></span><span>{t.balance}</span></div>
              <div className="rule-item"><span className="rule-icon"><ShieldCheck size={17} /></span><span>{t.server}</span></div>
            </div>
            <div className="side-divider" />
            <div className="cherry-prize-card reef-prize-card"><span>{t.best}</span><strong>♆ ♆ ♆ ♆ ♆</strong><small>{t.multiplier}</small></div>
            <div className="notice-card"><CircleDollarSign size={19} /><span>{t.notice}</span></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
