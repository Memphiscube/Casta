"use client";

import { ShoppingBag } from "lucide-react";

import { ShopCatalog } from "@/components/shop-catalog";
import { useI18n } from "@/components/i18n-provider";

const copy = { en: { shop: "Club shop", title: "A style that stays yours", intro: "Exchange earned coins for frames, themes and effects. No payments." }, cs: { shop: "Klubový obchod", title: "Styl, který zůstane tvůj", intro: "Vyměň získané mince za rámečky, motivy a efekty. Bez plateb." } } as const;

export default function ShopPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  return (
    <div className="page-shell">
      <div className="site-container">
        <header className="section-heading">
          <span className="eyebrow"><ShoppingBag size={15} /> {t.shop}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>
        <ShopCatalog />
      </div>
    </div>
  );
}
