"use client";

import {
  CircleUserRound,
  Coins,
  Gamepad2,
  Gift,
  ListChecks,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";

const links = [
  { href: "/how-it-works", label: "Як це працює", icon: ListChecks },
  { href: "/games", label: "Ігри", icon: Gamepad2 },
  { href: "/rewards", label: "Нагороди", icon: Gift },
  { href: "/shop", label: "Магазин", icon: ShoppingBag },
  { href: "/profile", label: "Профіль", icon: CircleUserRound },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="brand" aria-label="CASTA — на головну">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt=""
            width={911}
            height={236}
            aria-hidden="true"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Головна навігація">
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
          <div className="balance-pill" aria-label={`${profile.balance} віртуальних монет`}>
            <Coins size={17} />
            <strong>{profile.balance.toLocaleString("uk-UA")}</strong>
          </div>
          <Link href={user ? "/profile" : "/login"} className="avatar-button" aria-label="Відкрити акаунт">
            <CircleUserRound size={21} />
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Мобільна навігація">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <Icon size={19} />
              {label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            <CircleUserRound size={19} />
            {user ? "Мій акаунт" : "Увійти"}
          </Link>
        </nav>
      )}
    </header>
  );
}
