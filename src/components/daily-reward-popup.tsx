"use client";

import { AlarmClock, Check, Gift, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { dailyRewards } from "@/lib/data";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type RewardPayload = { amount: number; balance: number; streak: number };

function isRewardPayload(value: unknown): value is RewardPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return ["amount", "balance", "streak"].every((key) => typeof payload[key] === "number");
}

export function DailyRewardPopup() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const { locale, numberLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"ready" | "claiming" | "success" | "already">("ready");
  const [claimedAmount, setClaimedAmount] = useState<number | null>(null);
  const currentDay = Math.min(7, Math.max(1, profile.streak + 1));
  const amount = dailyRewards[currentDay - 1].coins;
  const copy = locale === "cs"
    ? { tier: `Den ${currentDay} · denní série`, ready: "Denní odměna je připravena!", readyText: "Tvoje bezplatné virtuální mince na dnešek čekají.", claim: "Vyzvednout mince zdarma", later: "Připomenout později", claiming: "Vyzvedáváme…", success: "Odměna vyzvednuta!", successText: "Virtuální mince byly přidány do tvého společného zůstatku.", continue: "Pokračovat ve hře", tomorrow: "Vrať se zítra!", tomorrowText: "Dnešní odměna už byla vyzvednuta. Další bude dostupná zítra.", close: "Dobře, uvidíme se zítra", closeLabel: "Zavřít denní odměnu" }
    : { tier: `Day ${currentDay} · daily streak`, ready: "Daily reward ready!", readyText: "Your free virtual coins for today are waiting.", claim: "Claim free coins", later: "Remind me later", claiming: "Collecting…", success: "Reward collected!", successText: "Virtual coins were added to your shared balance.", continue: "Continue playing", tomorrow: "Come back tomorrow!", tomorrowText: "Today’s reward has already been collected. Your next reward will be available tomorrow.", close: "OK, see you tomorrow", closeLabel: "Close daily reward" };

  useEffect(() => {
    if (!user || loading) return;
    const key = `casta_daily_popup_seen_${user.id}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    const timer = window.setTimeout(() => setOpen(true), 850);
    return () => window.clearTimeout(timer);
  }, [loading, user]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function claimReward() {
    if (status === "claiming") return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !user) return;
    setStatus("claiming");
    const { data, error } = await supabase.rpc("claim_daily_reward");
    if (error || !isRewardPayload(data)) {
      setStatus("already");
      return;
    }
    setClaimedAmount(data.amount);
    await refreshProfile();
    setStatus("success");
  }

  if (!open || !user) return null;
  const shownAmount = claimedAmount ?? amount;

  return (
    <div className="reward-popup-backdrop" role="presentation">
      <section className="reward-popup-card" role="dialog" aria-modal="true" aria-label={status === "already" ? copy.tomorrow : copy.ready}>
        <button className="reward-popup-close" type="button" onClick={() => setOpen(false)} aria-label={copy.closeLabel}><X size={20} /></button>
        {status === "already" ? (
          <>
            <span className="reward-popup-clock"><AlarmClock size={56} /></span>
            <h2>{copy.tomorrow}</h2>
            <p>{copy.tomorrowText}</p>
            <button className="button button-primary" type="button" onClick={() => setOpen(false)}>{copy.close}</button>
          </>
        ) : (
          <>
            <Image className="reward-popup-coin" src="/games/jungle-wheel-coins.png" alt="" width={118} height={118} />
            <span className="reward-popup-tier">{status === "success" ? <Check size={14} /> : <Gift size={14} />} {copy.tier}</span>
            <h2>{status === "success" ? copy.success : copy.ready}</h2>
            <p>{status === "success" ? copy.successText : copy.readyText}</p>
            <div className="reward-popup-amount"><Image src="/games/jungle-wheel-coins.png" alt="" width={44} height={44} /><strong>{shownAmount.toLocaleString(numberLocale)}</strong><span>CASTA COINS</span></div>
            <button className="button button-primary" type="button" disabled={status === "claiming"} onClick={() => status === "success" ? setOpen(false) : void claimReward()}>
              {status === "success" ? <Check size={18} /> : <Gift size={18} />}{status === "claiming" ? copy.claiming : status === "success" ? copy.continue : copy.claim}
            </button>
            {status === "ready" && <button className="reward-popup-later" type="button" onClick={() => setOpen(false)}>{copy.later}</button>}
          </>
        )}
      </section>
    </div>
  );
}
