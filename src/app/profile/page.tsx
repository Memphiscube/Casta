import type { Metadata } from "next";

import { ProfileDashboard } from "@/components/profile-dashboard";

export const metadata: Metadata = {
  title: "Profile",
  description: "CASTA player progress, balance and achievements.",
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
