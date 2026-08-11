"use client";

import { Check, Coins, Frame, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { localize, useI18n } from "@/components/i18n-provider";
import { shopItems } from "@/lib/data";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const itemIcons = [Frame, Sparkles, Palette, ShieldCheck];

type PurchasePayload = {
  balance: number;
  item_slug: string;
};

function isPurchasePayload(value: unknown): value is PurchasePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.balance === "number" && typeof payload.item_slug === "string";
}

export function ShopCatalog() {
  const { locale, numberLocale } = useI18n();
  const t = {
    en: { initial: "All items are cosmetic and do not affect game results.", insufficient: "Not enough coins. Collect the daily reward or play Jungle Wheel.", error: "The item could not be added to your collection.", added: "The item was added to your collection.", owned: "In collection", adding: "Adding…", get: "Get item", wallet: "Your wallet", available: "Available", notice: "There are no payments in the shop. You can only spend virtual coins earned in the game." },
    cs: { initial: "Všechny předměty jsou kosmetické a neovlivňují výsledky her.", insufficient: "Nemáš dost mincí. Vyzvedni si denní odměnu nebo si zahraj Jungle Wheel.", error: "Předmět se nepodařilo přidat do sbírky.", added: "Předmět byl přidán do tvé sbírky.", owned: "Ve sbírce", adding: "Přidáváme…", get: "Získat", wallet: "Tvoje peněženka", available: "K dispozici", notice: "V obchodě nejsou žádné platby. Utratit lze pouze virtuální mince získané ve hře." },
  }[locale];
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [owned, setOwned] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function purchase(slug: string, price: number) {
    if (busy || owned.includes(slug)) return;
    if (profile.balance < price) {
      setMessage(t.insufficient);
      return;
    }

    setBusy(slug);
    const supabase = getSupabaseBrowserClient();

    if (user && supabase) {
      const { data, error } = await supabase.rpc("purchase_shop_item", { p_item_slug: slug });
      if (error || !isPurchasePayload(data)) {
        setMessage(error?.message ?? t.error);
        setBusy(null);
        return;
      }
      await refreshProfile();
    } else {
      setGuestBalance(profile.balance - price);
    }

    setOwned((current) => [...current, slug]);
    setMessage(t.added);
    setBusy(null);
  }

  return (
    <div className="shop-layout">
      <div className="shop-grid">
        {shopItems.map((item, index) => {
          const Icon = itemIcons[index];
          const isOwned = owned.includes(item.slug);
          return (
            <article key={item.slug} className={`shop-card accent-${item.accent}`}>
              <div className="shop-art">
                <span className="shop-art-symbol"><Icon size={43} /></span>
              </div>
              <div className="shop-card-body">
                <span>{localize(item.type, locale)}</span>
                <h3>{item.name}</h3>
                <div className="shop-card-actions">
                  <strong className="price"><Coins size={17} /> {item.price.toLocaleString(numberLocale)}</strong>
                  <button
                    type="button"
                    className="button button-secondary"
                    disabled={busy === item.slug || isOwned}
                    onClick={() => void purchase(item.slug, item.price)}
                  >
                    {isOwned ? <><Check size={17} /> {t.owned}</> : busy === item.slug ? t.adding : t.get}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="shop-summary">
        <h2>{t.wallet}</h2>
        <div className="summary-balance">
          <span>{t.available}</span>
          <strong>{profile.balance.toLocaleString(numberLocale)} 🪙</strong>
        </div>
        <p>{message ?? t.initial}</p>
        <div className="notice-card">
          <ShieldCheck size={18} />
          <span>{t.notice}</span>
        </div>
      </aside>
    </div>
  );
}
