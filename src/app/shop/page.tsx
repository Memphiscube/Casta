import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";

import { ShopCatalog } from "@/components/shop-catalog";

export const metadata: Metadata = {
  title: "Магазин",
  description: "Косметичні предмети CASTA за віртуальні монети.",
};

export default function ShopPage() {
  return (
    <div className="page-shell">
      <div className="site-container">
        <header className="section-heading">
          <span className="eyebrow"><ShoppingBag size={15} /> Club shop</span>
          <h1>Стиль, який залишається твоїм</h1>
          <p>Обмінюй зароблені монети на рамки, теми й ефекти. Жодних платежів.</p>
        </header>
        <ShopCatalog />
      </div>
    </div>
  );
}
