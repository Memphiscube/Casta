import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthProvider } from "@/components/auth-provider";
import { FloatingBackground } from "@/components/floating-background";
import { I18nProvider } from "@/components/i18n-provider";
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
    default: "CASTA — free social casino for play and collections",
    template: "%s · CASTA",
  },
  description:
    "Play for free, collect virtual coins and unlock club rewards. No real-money betting or prizes.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "CASTA — play for the moment",
    description: "A social casino with virtual coins, collections and daily rewards.",
    type: "website",
    locale: "uk_UA",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "CASTA — social casino with virtual coins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CASTA — play for the moment",
    description: "A social casino with virtual coins, collections and daily rewards.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <AuthProvider>
            <FloatingBackground />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
