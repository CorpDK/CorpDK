import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Carter_One, Noto_Sans, Noto_Sans_Mono, Rochester } from "next/font/google";
import type { ReactNode } from "react";
import { metadataFields } from "../lib/content";
import { Providers } from "./providers";
import { WebVitals } from "./web-vitals";
import "./globals.css";

const wordmark = Rochester({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-wordmark",
  weight: "400",
});

const name = Carter_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-name",
  weight: "400",
});

const sans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-57TRFSCL";

export const metadata: Metadata = metadataFields;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#572573" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${wordmark.variable} ${name.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={gtmId} />
      <body>
        <Providers>{children}</Providers>
        <WebVitals />
      </body>
    </html>
  );
}
