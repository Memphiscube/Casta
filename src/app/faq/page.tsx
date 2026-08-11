import type { Metadata } from "next";

import { FaqPage } from "@/components/faq-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about CASTA accounts, virtual coins, rewards and free social casino games.",
};

export default function Page() {
  return <FaqPage />;
}
