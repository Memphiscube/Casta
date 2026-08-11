"use client";

import {
  Ban,
  CircleUserRound,
  Coins,
  Gamepad2,
  Gift,
  ListChecks,
  Menu,
  ShoppingBag,
  ShieldCheck,
  Smile,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";

const linkDefinitions = [
  { href: "/how-it-works", key: "how" as const, icon: ListChecks },
  { href: "/games", key: "games" as const, icon: Gamepad2 },
  { href: "/rewards", key: "rewards" as const, icon: Gift },
  { href: "/shop", key: "shop" as const, icon: ShoppingBag },
  { href: "/profile", key: "profile" as const, icon: CircleUserRound },
];

const headerCopy = {
  en: {
    links: { how: "How it works", games: "Games", rewards: "Rewards", shop: "Shop", profile: "Profile" },
    notices: ["Free social casino", "Virtual coins only", "No real money", "Play for fun", "18+ only"],
    home: "CASTA — home",
    navigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    coins: "virtual coins",
    account: "Open account",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    myAccount: "My account",
    signIn: "Sign in",
    important: "Important information about CASTA",
    language: "Language",
  },
  cs: {
    links: { how: "Jak to funguje", games: "Hry", rewards: "Odměny", shop: "Obchod", profile: "Profil" },
    notices: ["Social casino zdarma", "Pouze virtuální mince", "Žádné skutečné peníze", "Hra pro zábavu", "Pouze 18+"],
    home: "CASTA — domů",
    navigation: "Hlavní navigace",
    mobileNavigation: "Mobilní navigace",
    coins: "virtuálních mincí",
    account: "Otevřít účet",
    closeMenu: "Zavřít nabídku",
    openMenu: "Otevřít nabídku",
    myAccount: "Můj účet",
    signIn: "Přihlásit se",
    important: "Důležité informace o CASTA",
    language: "Jazyk",
  },
} as const;

const noticeIcons = [Star, Coins, Ban, Smile, ShieldCheck];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const { locale, numberLocale, setLocale } = useI18n();
  const copy = headerCopy[locale];
  const links = linkDefinitions.map((link) => ({ ...link, label: copy.links[link.key] }));
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="brand" aria-label={copy.home}>
          <Image
            className="brand-logo"
            src="/logo.png"
            alt=""
            width={911}
            height={236}
            aria-hidden="true"
          />
        </Link>

        <nav className="desktop-nav" aria-label={copy.navigation}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname.startsWith(href) ? "nav-link active" : "nav-link"}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switcher" aria-label={copy.language} role="group">
            <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} aria-pressed={locale === "en"}>EN</button>
            <button type="button" className={locale === "cs" ? "active" : ""} onClick={() => setLocale("cs")} aria-pressed={locale === "cs"}>CZ</button>
          </div>
          <div className="balance-pill" aria-label={`${profile.balance} ${copy.coins}`}>
            <Coins size={17} />
            <strong>{profile.balance.toLocaleString(numberLocale)}</strong>
          </div>
          <Link href={user ? "/profile" : "/login"} className="avatar-button" aria-label={copy.account}>
            <CircleUserRound size={21} />
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label={copy.mobileNavigation}>
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <Icon size={19} />
              {label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            <CircleUserRound size={19} />
            {user ? copy.myAccount : copy.signIn}
          </Link>
        </nav>
      )}

      <aside className="club-notice-strip" aria-label={copy.important}>
        <div className="club-notice-inner">
          {copy.notices.map((label, index) => {
            const Icon = noticeIcons[index];
            return (
            <span className="club-notice-item" key={label}>
              <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
              {label}
            </span>
            );
          })}
        </div>
      </aside>
    </header>
  );
}
