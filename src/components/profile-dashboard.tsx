"use client";

import {
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/components/auth-provider";

export function ProfileDashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const progress = Math.min(100, Math.round((profile.xp / 2500) * 100));

  if (loading) return <div className="notice-card">Завантажуємо клубний профіль…</div>;

  return (
    <div className="profile-layout">
      <section className="profile-card">
        <div className="profile-avatar">
          <Image src="/games/casta-player-crest.png" alt="Клубний герб профілю" width={108} height={108} priority />
        </div>
        <span className="eyebrow">Клубний профіль</span>
        <h1>{profile.username}</h1>
        <p className="profile-subtitle">{user?.email ?? "Гостьовий профіль на цьому пристрої"}</p>

        <div className="level-row">
          <span>Рівень {profile.level}</span>
          <span>{profile.xp.toLocaleString("uk-UA")} / 2 500 XP</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

        <div className="profile-stats">
          <div className="profile-stat"><span>Баланс</span><strong>{profile.balance.toLocaleString("uk-UA")}</strong></div>
          <div className="profile-stat"><span>Серія</span><strong>{profile.streak} дні</strong></div>
          <div className="profile-stat"><span>Ігор</span><strong>24</strong></div>
          <div className="profile-stat"><span>Трофеїв</span><strong>6</strong></div>
        </div>

        <div className="profile-actions">
          {!user && <Link href="/login" className="button button-primary">Зберегти прогрес</Link>}
          {user && (
            <button type="button" className="button button-danger" onClick={() => void signOut()}>
              <LogOut size={17} /> Вийти з акаунта
            </button>
          )}
        </div>
      </section>

      <div className="profile-panel-grid">
        <section className="profile-panel">
          <h2>Досягнення</h2>
          <div className="achievement-list">
            <div className="achievement-item">
              <span className="achievement-icon"><Image src="/games/jungle-wheel-paw-medallion.png" alt="" width={46} height={46} /></span>
              <span><strong>Перший оберт</strong>Зіграй першу партію в Jungle Wheel.</span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon"><Image src="/games/casta-streak-flame.png" alt="" width={46} height={46} /></span>
              <span><strong>Тримай темп</strong>Збери серію входів протягом 3 днів.</span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon"><Image src="/games/jungle-wheel-temple-crown.png" alt="" width={46} height={46} /></span>
              <span><strong>Клубний стиль</strong>Отримай перший косметичний предмет.</span>
            </div>
          </div>
        </section>

        <section className="profile-panel">
          <h2>Остання активність</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon"><Image src="/games/jungle-wheel-coins.png" alt="" width={46} height={46} /></span>
              <span><strong>Щоденна нагорода</strong>+500 віртуальних монет.</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon"><Image src="/games/jungle-wheel-explorer-trophy.png" alt="" width={46} height={46} /></span>
              <span><strong>Jungle Wheel</strong>Найкращий сектор сьогодні — ×5.</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon"><Image src="/games/jungle-wheel-amethyst.png" alt="" width={46} height={46} /></span>
              <span><strong>Новий рівень</strong>Відкрито рівень {profile.level}.</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
