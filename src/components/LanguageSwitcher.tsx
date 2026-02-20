"use client";

import type { ChangeEvent } from "react";
import { useLingoContext } from "@lingo.dev/compiler/react";
import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_OPTIONS,
  type AppLocale,
} from "@/lib/locales";

export default function LanguageSwitcher() {
  const { locale, setLocale, isLoading } = useLingoContext();

  const currentLocale: AppLocale = isAppLocale(locale) ? locale : DEFAULT_LOCALE;

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    if (isAppLocale(nextLocale)) {
      await setLocale(nextLocale);
    }
  };

  return (
    <label className="flex items-center gap-2 text-xs text-zinc-500">
      <span className="hidden sm:inline">Locale</span>
      <select
        aria-label="Language"
        className="select-base h-8 w-auto min-w-24 px-2.5 text-xs text-zinc-700"
        disabled={isLoading}
        onChange={handleChange}
        value={currentLocale}
      >
        {LOCALE_OPTIONS.map((localeOption) => (
          <option key={localeOption.code} value={localeOption.code}>
            {localeOption.label}
          </option>
        ))}
      </select>
    </label>
  );
}
