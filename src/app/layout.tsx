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
  icons: {
    icon: [{ url: "/langos-icon.svg", type: "image/svg+xml" }],
    shortcut: "/langos-icon.svg",
  },
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
          <footer className="border-t border-[color:var(--line)]">
            <div className="shell content-shell py-6">
              <div className="flex flex-col items-start gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="m-0 text-[color:var(--text)]">
                  Built by{" "}
                  <a
                    className="text-[color:color-mix(in_oklab,var(--accent)_82%,var(--text))] transition-opacity hover:opacity-70"
                    href="https://ashishgogula.in"
                    rel="noreferrer"
                    target="_blank"
                  >
                    AshishGogula
                  </a>
                </p>

                <nav
                  aria-label="Footer links"
                  className="flex flex-wrap items-center gap-4 sm:justify-end sm:gap-6"
                >
                  <a
                    className="text-[color:color-mix(in_oklab,var(--accent)_82%,var(--text))] transition-opacity hover:opacity-70"
                    href="https://www.ashishgogula.in/blogs/localization-is-an-architecture-problem-building-a-production-grade-i18n-system-with-langos-and-lingo-dev"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Blog
                  </a>
                  <a
                    className="text-[color:color-mix(in_oklab,var(--accent)_82%,var(--text))] transition-opacity hover:opacity-70"
                    href="https://github.com/ashishgogula/LangOS"
                    rel="noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                  <a
                    className="text-[color:color-mix(in_oklab,var(--accent)_82%,var(--text))] transition-opacity hover:opacity-70"
                    href="https://lingo.dev"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Lingo.dev
                  </a>
                </nav>
              </div>
            </div>
          </footer>
        </LingoProvider>
      </body>
    </html>
  );
}
