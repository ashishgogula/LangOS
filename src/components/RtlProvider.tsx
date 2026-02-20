"use client";

import { useLingoContext } from "@lingo.dev/compiler/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { DEFAULT_LOCALE, isAppLocale, isRtlLocale } from "@/lib/locales";

export default function RtlProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { locale } = useLingoContext();

  useEffect(() => {
    const activeLocale = isAppLocale(locale) ? locale : DEFAULT_LOCALE;
    document.documentElement.lang = activeLocale;
    document.documentElement.dir = isRtlLocale(activeLocale) ? "rtl" : "ltr";
  }, [locale]);

  return <>{children}</>;
}
