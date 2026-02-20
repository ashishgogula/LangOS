import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { LingoProvider } from "@lingo.dev/compiler/react/next";
import Navigation from "@/components/Navigation";
import RtlProvider from "@/components/RtlProvider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const THEME_INIT_SCRIPT = `(() => {
  try {
    const key = "langos:theme:v1";
    const stored = window.localStorage.getItem(key);
    const resolved = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();`;

export const metadata: Metadata = {
  title: "LangOS",
  description: "Lingo.dev localization starter with onboarding and release checks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <LingoProvider>
          <RtlProvider>
            <div className="min-h-screen">
              <Navigation />
              <main className="shell-container py-8 sm:py-10">{children}</main>
            </div>
          </RtlProvider>
        </LingoProvider>
      </body>
    </html>
  );
}
