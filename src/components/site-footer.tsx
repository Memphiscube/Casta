"use client";

import { Coins, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/components/i18n-provider";

const footerCopy = {
  en: {
    intro: "A social casino for relaxation, collections and friendly competition.",
    age: "18+ · No real-money bets or prizes",
    value: "Virtual coins have no monetary value",
    responsible: "This is a free social casino game intended solely for entertainment. No real money gambling is offered, no prizes or items of monetary value can be won, and playing this game does not imply future success in real-money gambling.",
    help: "Help & support:",
    helpLabel: "Help and support websites",
    adultLabel: "For adults aged 18 and over",
    links: ["How it works", "Games", "Rewards", "Account", "Privacy Policy", "Terms"],
  },
  cs: {
    intro: "Social casino pro odpočinek, sbírky a přátelské soutěžení.",
    age: "18+ · Bez sázek a výher ve skutečných penězích",
    value: "Virtuální mince nemají peněžní hodnotu",
    responsible: "Toto je bezplatná social casino hra určená výhradně pro zábavu. Neobsahuje hazardní hry o skutečné peníze, nelze v ní vyhrát ceny ani předměty s peněžní hodnotou a hraní této hry neznamená budoucí úspěch v hazardních hrách o skutečné peníze.",
    help: "Pomoc a podpora:",
    helpLabel: "Weby pomoci a podpory",
    adultLabel: "Pro dospělé od 18 let",
    links: ["Jak to funguje", "Hry", "Odměny", "Účet", "Ochrana soukromí", "Podmínky"],
  },
} as const;

export function SiteFooter() {
  const { locale } = useI18n();
  const copy = footerCopy[locale];

  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <Image
              className="brand-logo"
              src="/logo.png"
              alt="CASTA"
              width={911}
              height={236}
            />
          </Link>
          <p className="footer-copy">
            {copy.intro}
          </p>
        </div>
        <div className="footer-note">
          <ShieldCheck size={20} />
          <span>{copy.age}</span>
        </div>
        <div className="footer-note">
          <Coins size={20} />
          <span>{copy.value}</span>
        </div>
      </div>

      <aside className="site-container footer-responsible-panel" aria-label="Responsible social casino information">
        <div className="footer-age-badge" aria-label={copy.adultLabel}>
          18+
        </div>
        <div className="footer-responsible-copy">
          <p>
            {copy.responsible}
          </p>
          <div className="footer-help-links" aria-label={copy.helpLabel}>
            <strong>{copy.help}</strong>
            <a href="https://www.chciodvykat.cz/" target="_blank" rel="noopener noreferrer">
              chciodvykat.cz <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href="https://podaneruce.cz/" target="_blank" rel="noopener noreferrer">
              podaneruce.cz <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href="https://poradna.adiktologie.cz/" target="_blank" rel="noopener noreferrer">
              poradna.adiktologie.cz <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>

      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} CASTA</span>
        <div>
          <Link href="/how-it-works">{copy.links[0]}</Link>
          <Link href="/games">{copy.links[1]}</Link>
          <Link href="/rewards">{copy.links[2]}</Link>
          <Link href="/login">{copy.links[3]}</Link>
          <Link href="/privacy">{copy.links[4]}</Link>
          <Link href="/terms">{copy.links[5]}</Link>
        </div>
      </div>
    </footer>
  );
}
