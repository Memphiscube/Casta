"use client";

import Image from "next/image";

import { RewardsBoard } from "@/components/rewards-board";
import { useI18n } from "@/components/i18n-provider";

const copy = { en: { ritual: "Daily ritual", title: "Your reward streak", intro: "Come back every day, collect virtual coins and unlock club items." }, cs: { ritual: "Denní rituál", title: "Tvoje série odměn", intro: "Vracej se každý den, sbírej virtuální mince a odemykej klubové předměty." } } as const;

export default function RewardsPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  return (
    <div className="page-shell">
      <div className="site-container">
        <header className="section-heading">
          <span className="eyebrow">
            <Image className="eyebrow-3d-symbol" src="/games/jungle-wheel-treasure-chest.png" alt="" width={28} height={28} />
            {t.ritual}
          </span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>
        <RewardsBoard />
      </div>
    </div>
  );
}
