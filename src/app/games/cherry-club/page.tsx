import type { Metadata } from "next";
import {
  ArrowLeft,
  Cherry,
  CircleDollarSign,
  Coins,
  Grid3X3,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import Link from "next/link";

import { CherryClubSlots } from "@/components/cherry-club-slots";

export const metadata: Metadata = {
  title: "Cherry Club",
  description: "Безкоштовні слоти Cherry Club 5×5 із віртуальними монетами CASTA.",
};

export default function CherryClubPage() {
  return (
    <div className="page-shell compact cherry-game-page">
      <div className="site-container">
        <div className="game-page-head">
          <Link href="/games" className="back-link"><ArrowLeft size={17} /> До каталогу</Link>
          <span className="game-mode-pill">Гостьовий режим доступний</span>
        </div>

        <div className="wheel-layout cherry-layout">
          <CherryClubSlots />

          <aside className="side-panel cherry-side-panel">
            <span className="eyebrow"><Cherry size={15} /> Cherry Club</span>
            <h2>Як грати</h2>
            <div className="rules-list">
              <div className="rule-item">
                <span className="rule-icon"><Grid3X3 size={17} /></span>
                <span>На полі 5×5 працюють 10 фіксованих виграшних ліній.</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><Trophy size={17} /></span>
                <span>Збери від 3 до 5 однакових символів поспіль, починаючи зліва.</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><Coins size={17} /></span>
                <span>Ставка й виграш одразу змінюють спільний баланс профілю.</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon"><ShieldCheck size={17} /></span>
                <span>Для акаунтів результат і гаманець обробляються на сервері Supabase.</span>
              </div>
            </div>

            <div className="side-divider" />

            <div className="cherry-prize-card">
              <span>Найкраща комбінація</span>
              <strong>7 7 7 7 7</strong>
              <small>×25 від ставки за одну лінію</small>
            </div>

            <div className="notice-card">
              <CircleDollarSign size={19} />
              <span>
                Це social casino. У грі немає ставок реальними грошима,
                купівлі монет або виведення призів.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
