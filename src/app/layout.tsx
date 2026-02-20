import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// @ts-ignore
import { LingoProvider } from "@lingo.dev/compiler/react";
import RtlProvider from "@/components/RtlProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangOS App",
  description: "Lingo.dev SDK demo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen`}>
        <LingoProvider>
          <RtlProvider>
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </RtlProvider>
        </LingoProvider>
      </body>
    </html>
  );
}
