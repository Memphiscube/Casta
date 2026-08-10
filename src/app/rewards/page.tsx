import type { Metadata } from "next";
import Image from "next/image";

import { RewardsBoard } from "@/components/rewards-board";

export const metadata: Metadata = {
  title: "Нагороди",
  description: "Щоденні серії та клубні нагороди CASTA.",
};

export default function RewardsPage() {
  return (
    <div className="page-shell">
      <div className="site-container">
        <header className="section-heading">
          <span className="eyebrow">
            <Image className="eyebrow-3d-symbol" src="/games/jungle-wheel-treasure-chest.png" alt="" width={28} height={28} />
            Щоденний ритуал
          </span>
          <h1>Твоя серія нагород</h1>
          <p>Повертайся щодня, забирай віртуальні монети та відкривай клубні предмети.</p>
        </header>
        <RewardsBoard />
      </div>
    </div>
  );
}
