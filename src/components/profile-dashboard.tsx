"use client";

import {
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";

export function ProfileDashboard() {
  const { locale, numberLocale } = useI18n();
  const t = {
    en: { loading: "Loading your club profile…", crest: "Club profile crest", profile: "Club profile", guest: "Guest profile on this device", level: "Level", balance: "Balance", streak: "Streak", days: "days", games: "Games", trophies: "Trophies", save: "Save progress", logout: "Sign out", achievements: "Achievements", first: "First spin", firstText: "Play your first Jungle Wheel round.", pace: "Keep the pace", paceText: "Build a 3-day login streak.", style: "Club style", styleText: "Collect your first cosmetic item.", activity: "Recent activity", daily: "Daily reward", dailyText: "+500 virtual coins.", best: "Today’s best sector — ×5.", newLevel: "New level", unlocked: "Level {level} unlocked." },
    cs: { loading: "Načítáme tvůj klubový profil…", crest: "Klubový erb profilu", profile: "Klubový profil", guest: "Profil hosta na tomto zařízení", level: "Úroveň", balance: "Zůstatek", streak: "Série", days: "dní", games: "Hry", trophies: "Trofeje", save: "Uložit pokrok", logout: "Odhlásit se", achievements: "Úspěchy", first: "První roztočení", firstText: "Zahraj první kolo Jungle Wheel.", pace: "Drž tempo", paceText: "Vytvoř třídenní sérii přihlášení.", style: "Klubový styl", styleText: "Získej první kosmetický předmět.", activity: "Poslední aktivita", daily: "Denní odměna", dailyText: "+500 virtuálních mincí.", best: "Dnešní nejlepší sektor — ×5.", newLevel: "Nová úroveň", unlocked: "Odemčena úroveň {level}." },
  }[locale];
  const { user, profile, loading, signOut } = useAuth();
  const progress = Math.min(100, Math.round((profile.xp / 2500) * 100));

  if (loading) return <div className="notice-card">{t.loading}</div>;

  return (
    <div className="profile-layout">
      <section className="profile-card">
        <div className="profile-avatar">
          <Image src="/games/casta-player-crest.png" alt={t.crest} width={108} height={108} priority />
        </div>
        <span className="eyebrow">{t.profile}</span>
        <h1>{profile.username}</h1>
        <p className="profile-subtitle">{user?.email ?? t.guest}</p>

        <div className="level-row">
          <span>{t.level} {profile.level}</span>
          <span>{profile.xp.toLocaleString(numberLocale)} / 2,500 XP</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

        <div className="profile-stats">
          <div className="profile-stat"><span>{t.balance}</span><strong>{profile.balance.toLocaleString(numberLocale)}</strong></div>
          <div className="profile-stat"><span>{t.streak}</span><strong>{profile.streak} {t.days}</strong></div>
          <div className="profile-stat"><span>{t.games}</span><strong>24</strong></div>
          <div className="profile-stat"><span>{t.trophies}</span><strong>6</strong></div>
        </div>

        <div className="profile-actions">
          {!user && <Link href="/login" className="button button-primary">{t.save}</Link>}
          {user && (
            <button type="button" className="button button-danger" onClick={() => void signOut()}>
              <LogOut size={17} /> {t.logout}
            </button>
          )}
        </div>
      </section>

      <div className="profile-panel-grid">
        <section className="profile-panel">
          <h2>{t.achievements}</h2>
          <div className="achievement-list">
            <div className="achievement-item">
              <span className="achievement-icon"><Image src="/games/jungle-wheel-paw-medallion.png" alt="" width={46} height={46} /></span>
              <span><strong>{t.first}</strong>{t.firstText}</span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon"><Image src="/games/casta-streak-flame.png" alt="" width={46} height={46} /></span>
              <span><strong>{t.pace}</strong>{t.paceText}</span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon"><Image src="/games/jungle-wheel-temple-crown.png" alt="" width={46} height={46} /></span>
              <span><strong>{t.style}</strong>{t.styleText}</span>
            </div>
          </div>
        </section>

        <section className="profile-panel">
          <h2>{t.activity}</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon"><Image src="/games/jungle-wheel-coins.png" alt="" width={46} height={46} /></span>
              <span><strong>{t.daily}</strong>{t.dailyText}</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon"><Image src="/games/jungle-wheel-explorer-trophy.png" alt="" width={46} height={46} /></span>
              <span><strong>Jungle Wheel</strong>{t.best}</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon"><Image src="/games/jungle-wheel-amethyst.png" alt="" width={46} height={46} /></span>
              <span><strong>{t.newLevel}</strong>{t.unlocked.replace("{level}", String(profile.level))}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
