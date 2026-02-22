import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistPixelLine } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { LingoProvider } from "@lingo.dev/compiler/react/next";
import Navigation from "@/components/Navigation";
import { DEFAULT_LOCALE } from "@/lib/locales";
import "./globals.css";

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
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelLine.variable} min-h-screen antialiased`}
      >
        <LingoProvider
          initialLocale={DEFAULT_LOCALE}
          devWidget={{ enabled: false }}
        >
          <Navigation />
          <main className="shell content-shell pb-10 sm:pb-12">{children}</main>
          <footer className="shell content-shell border-y border-dotted border-[color:var(--line)] py-6 text-center text-sm text-[color:var(--muted)]">
            Built by{" "}
            <a
              className="font-semibold text-[color:var(--text)] underline-offset-4 hover:underline"
              href="https://ashishgogula.in"
              rel="noreferrer"
              target="_blank"
            >
              ashishgogula
            </a>
            .
          </footer>
        </LingoProvider>
      </body>
    </html>
  );
}
