import type { Metadata } from "next";

import { TermsPolicy } from "@/components/terms-policy";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing access to and use of the CASTA social casino.",
};

export default function TermsPage() {
  return <TermsPolicy />;
}
