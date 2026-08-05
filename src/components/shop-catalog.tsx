"use client";

import { Check, Coins, Frame, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";
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
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [owned, setOwned] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("Усі предмети косметичні й не впливають на результат гри.");

  async function purchase(slug: string, price: number) {
    if (busy || owned.includes(slug)) return;
    if (profile.balance < price) {
      setMessage("Недостатньо монет. Забери щоденну нагороду або зіграй у Jungle Wheel.");
      return;
    }

    setBusy(slug);
    const supabase = getSupabaseBrowserClient();

    if (user && supabase) {
      const { data, error } = await supabase.rpc("purchase_shop_item", { p_item_slug: slug });
      if (error || !isPurchasePayload(data)) {
        setMessage(error?.message ?? "Не вдалося додати предмет до колекції.");
        setBusy(null);
        return;
      }
      await refreshProfile();
    } else {
      setGuestBalance(profile.balance - price);
    }

    setOwned((current) => [...current, slug]);
    setMessage("Предмет додано до твоєї колекції.");
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
                <span>{item.type}</span>
                <h3>{item.name}</h3>
                <div className="shop-card-actions">
                  <strong className="price"><Coins size={17} /> {item.price.toLocaleString("uk-UA")}</strong>
                  <button
                    type="button"
                    className="button button-secondary"
                    disabled={busy === item.slug || isOwned}
                    onClick={() => void purchase(item.slug, item.price)}
                  >
                    {isOwned ? <><Check size={17} /> У колекції</> : busy === item.slug ? "Додаємо…" : "Отримати"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="shop-summary">
        <h2>Твій гаманець</h2>
        <div className="summary-balance">
          <span>Доступно</span>
          <strong>{profile.balance.toLocaleString("uk-UA")} 🪙</strong>
        </div>
        <p>{message}</p>
        <div className="notice-card">
          <ShieldCheck size={18} />
          <span>У магазині немає платежів. Тут можна витрачати тільки зароблені virtual coins.</span>
        </div>
      </aside>
    </div>
  );
}
