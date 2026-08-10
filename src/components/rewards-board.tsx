"use client";

import { Check, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";
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
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [message, setMessage] = useState("Наступна нагорода готова до отримання.");
  const currentDay = Math.min(7, Math.max(1, profile.streak + 1));

  async function claimReward() {
    if (claiming || claimed) return;
    setClaiming(true);

    const supabase = getSupabaseBrowserClient();
    if (user && supabase) {
      const { data, error } = await supabase.rpc("claim_daily_reward");
      if (error || !isRewardPayload(data)) {
        setMessage(error?.message ?? "Нагорода сьогодні вже отримана.");
        setClaiming(false);
        return;
      }
      await refreshProfile();
      setMessage(`Готово! На баланс додано ${data.amount.toLocaleString("uk-UA")} монет.`);
    } else {
      const today = new Date().toISOString().slice(0, 10);
      if (window.localStorage.getItem(GUEST_REWARD_DATE) === today) {
        setMessage("Гостьову нагороду сьогодні вже отримано. Повертайся завтра.");
        setClaiming(false);
        return;
      }
      const amount = dailyRewards[currentDay - 1].coins;
      setGuestBalance(profile.balance + amount);
      window.localStorage.setItem(GUEST_REWARD_DATE, today);
      setMessage(`Готово! На баланс додано ${amount.toLocaleString("uk-UA")} монет.`);
    }

    setClaimed(true);
    setClaiming(false);
  }

  return (
    <div className="reward-hero">
      <section className="reward-board">
        <h2>Щоденна серія</h2>
        <div className="reward-grid">
          {dailyRewards.map(({ day, coins, image, alt }) => {
            const isClaimed = day < currentDay || (day === currentDay && claimed);
            const isCurrent = day === currentDay && !claimed;
            return (
              <div key={day} className={`reward-tile ${isClaimed ? "claimed" : ""} ${isCurrent ? "current" : ""}`}>
                <span>День {day}</span>
                <span className="reward-symbol-shell">
                  <Image className="reward-symbol-image" src={image} alt={alt} width={88} height={88} />
                  {(isClaimed || day > currentDay) && (
                    <span className={`reward-status-badge ${isClaimed ? "is-claimed" : "is-locked"}`} aria-label={isClaimed ? "Отримано" : "Заблоковано"}>
                      {isClaimed ? <Check size={15} /> : <LockKeyhole size={14} />}
                    </span>
                  )}
                </span>
                <strong>{coins.toLocaleString("uk-UA")} 🪙</strong>
              </div>
            );
          })}
        </div>
        <p className={claimed ? "form-message success" : "form-message"} style={{ marginTop: 20 }} aria-live="polite">
          {message}
        </p>
      </section>

      <aside className="streak-card">
        <div>
          <Image className="streak-3d-symbol" src="/games/casta-streak-flame.png" alt="Магічне полум’я серії" width={112} height={112} />
          <strong>{profile.streak}</strong>
          <span>дні поспіль</span>
          <p>Забирай нагороду щодня. Після сьомого дня цикл починається знову.</p>
        </div>
        <button type="button" className="button button-primary" disabled={claiming || claimed} onClick={claimReward}>
          {claimed ? <Check size={18} /> : <Image className="button-3d-symbol" src="/games/jungle-wheel-treasure-chest.png" alt="" width={24} height={24} />}
          {claiming ? "Отримуємо…" : claimed ? "Отримано" : "Забрати нагороду"}
        </button>
      </aside>
    </div>
  );
}
