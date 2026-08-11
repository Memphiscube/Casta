import type { Metadata } from "next";

import { PrivacyPolicy } from "@/components/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CASTA collects, uses and protects personal data.",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
