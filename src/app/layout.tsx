import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { LingoProvider } from "@lingo.dev/compiler/react/next";
import Navigation from "@/components/Navigation";
import { DEFAULT_LOCALE } from "@/lib/locales";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "LangOS",
  description: "LangOS: localization architecture, playground, and developer philosophy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <LingoProvider initialLocale={DEFAULT_LOCALE}>
          <Navigation />
          <main className="shell content-shell py-14 sm:py-16">{children}</main>
        </LingoProvider>
      </body>
    </html>
  );
}
