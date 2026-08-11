"use client";

import { Check, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { localize, useI18n } from "@/components/i18n-provider";
import { dailyRewards } from "@/lib/data";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const GUEST_REWARD_DATE = "casta_guest_reward_date";

type RewardPayload = {
  amount: number;
  balance: number;
  streak: number;
};

function isRewardPayload(value: unknown): value is RewardPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return ["amount", "balance", "streak"].every((key) => typeof payload[key] === "number");
}

export function RewardsBoard() {
  const { locale, numberLocale } = useI18n();
  const t = {
    en: { ready: "Your next reward is ready to collect.", already: "Today’s reward has already been collected.", added: (amount: string) => `Done! ${amount} coins were added to your balance.`, guestAlready: "Today’s guest reward has already been collected. Come back tomorrow.", streak: "Daily streak", day: "Day", claimed: "Claimed", locked: "Locked", flame: "Magical streak flame", consecutive: "consecutive days", note: "Collect a reward every day. After day seven, the cycle starts again.", claiming: "Collecting…", collect: "Collect reward" },
    cs: { ready: "Tvoje další odměna je připravena k vyzvednutí.", already: "Dnešní odměna už byla vyzvednuta.", added: (amount: string) => `Hotovo! Na zůstatek bylo přidáno ${amount} mincí.`, guestAlready: "Dnešní odměna pro hosta už byla vyzvednuta. Vrať se zítra.", streak: "Denní série", day: "Den", claimed: "Vyzvednuto", locked: "Uzamčeno", flame: "Magický plamen série", consecutive: "dní v řadě", note: "Vyzvedni si odměnu každý den. Po sedmém dni začne cyklus znovu.", claiming: "Vyzvedáváme…", collect: "Vyzvednout odměnu" },
  }[locale];
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const currentDay = Math.min(7, Math.max(1, profile.streak + 1));

  async function claimReward() {
    if (claiming || claimed) return;
    setClaiming(true);

    const supabase = getSupabaseBrowserClient();
    if (user && supabase) {
      const { data, error } = await supabase.rpc("claim_daily_reward");
      if (error || !isRewardPayload(data)) {
        setMessage(error?.message ?? t.already);
        setClaiming(false);
        return;
      }
      await refreshProfile();
      setMessage(t.added(data.amount.toLocaleString(numberLocale)));
    } else {
      const today = new Date().toISOString().slice(0, 10);
      if (window.localStorage.getItem(GUEST_REWARD_DATE) === today) {
        setMessage(t.guestAlready);
        setClaiming(false);
        return;
      }
      const amount = dailyRewards[currentDay - 1].coins;
      setGuestBalance(profile.balance + amount);
      window.localStorage.setItem(GUEST_REWARD_DATE, today);
      setMessage(t.added(amount.toLocaleString(numberLocale)));
    }

    setClaimed(true);
    setClaiming(false);
  }

  return (
    <div className="reward-hero">
      <section className="reward-board">
        <h2>{t.streak}</h2>
        <div className="reward-grid">
          {dailyRewards.map(({ day, coins, image, alt }) => {
            const isClaimed = day < currentDay || (day === currentDay && claimed);
            const isCurrent = day === currentDay && !claimed;
            return (
              <div key={day} className={`reward-tile ${isClaimed ? "claimed" : ""} ${isCurrent ? "current" : ""}`}>
                <span>{t.day} {day}</span>
                <span className="reward-symbol-shell">
                  <Image className="reward-symbol-image" src={image} alt={localize(alt, locale)} width={88} height={88} />
                  {(isClaimed || day > currentDay) && (
                    <span className={`reward-status-badge ${isClaimed ? "is-claimed" : "is-locked"}`} aria-label={isClaimed ? t.claimed : t.locked}>
                      {isClaimed ? <Check size={15} /> : <LockKeyhole size={14} />}
                    </span>
                  )}
                </span>
                <strong>{coins.toLocaleString(numberLocale)} 🪙</strong>
              </div>
            );
          })}
        </div>
        <p className={claimed ? "form-message success" : "form-message"} style={{ marginTop: 20 }} aria-live="polite">
          {message ?? t.ready}
        </p>
      </section>

      <aside className="streak-card">
        <div>
          <Image className="streak-3d-symbol" src="/games/casta-streak-flame.png" alt={t.flame} width={112} height={112} />
          <strong>{profile.streak}</strong>
          <span>{t.consecutive}</span>
          <p>{t.note}</p>
        </div>
        <button type="button" className="button button-primary" disabled={claiming || claimed} onClick={claimReward}>
          {claimed ? <Check size={18} /> : <Image className="button-3d-symbol" src="/games/jungle-wheel-treasure-chest.png" alt="" width={24} height={24} />}
          {claiming ? t.claiming : claimed ? t.claimed : t.collect}
        </button>
      </aside>
    </div>
  );
}
