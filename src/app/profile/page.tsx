import type { Metadata } from "next";

import { ProfileDashboard } from "@/components/profile-dashboard";

export const metadata: Metadata = {
  title: "Профіль",
  description: "Прогрес, баланс і досягнення гравця CASTA.",
};

export default function ProfilePage() {
  return (
    <div className="page-shell">
      <div className="site-container">
        <ProfileDashboard />
      </div>
    </div>
  );
}
