import type { Metadata } from "next";
import { ArrowLeft, CircleDollarSign, Clock3, Coins, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { JungleWheel } from "@/components/jungle-wheel";

export const metadata: Metadata = {
  title: "Jungle Wheel",
  description: "Безкоштовне колесо Jungle Wheel із віртуальними монетами.",
};

export default function JungleWheelPage() {
  return (
    <div className="page-shell compact jungle-game-page">
      <div className="site-container">
        <div className="game-page-head">
          <Link href="/games" className="back-link"><ArrowLeft size={17} /> До каталогу</Link>
          <span className="game-mode-pill">Гостьовий режим доступний</span>
        </div>

        <div className="wheel-layout">
          <JungleWheel />
          <aside className="side-panel">
            <span className="eyebrow">Jungle Wheel</span>
            <h2>Як це працює</h2>
            <div className="rules-list">
              <div className="rule-item">
                <span className="rule-icon"><Coins size={17} /></span>
                <span>Обери ставку від 50 до 500 віртуальних монет.</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><Clock3 size={17} /></span>
                <span>Кожне обертання триває кілька секунд і одразу оновлює баланс.</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><ShieldCheck size={17} /></span>
                <span>Для акаунтів результат і баланс обробляє Supabase на сервері.</span>
              </div>
            </div>
            <div className="side-divider" />
            <div className="notice-card">
              <CircleDollarSign size={19} />
              <span>
                Це social casino. Монети не можна купити за реальні гроші або
                обміняти на гроші чи призи.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
