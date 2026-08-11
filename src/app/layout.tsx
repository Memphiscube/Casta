import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthProvider } from "@/components/auth-provider";
import { FloatingBackground } from "@/components/floating-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "CASTA — social casino для гри й колекцій",
    template: "%s · CASTA",
  },
  description:
    "Грай безкоштовно, збирай віртуальні монети та відкривай клубні нагороди. Жодних ставок або виграшів у реальних грошах.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "CASTA — грай заради моменту",
    description: "Social casino з віртуальними монетами, колекціями та щоденними нагородами.",
    type: "website",
    locale: "uk_UA",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "CASTA — social casino з віртуальними монетами",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CASTA — грай заради моменту",
    description: "Social casino з віртуальними монетами, колекціями та щоденними нагородами.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        <AuthProvider>
          <FloatingBackground />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
