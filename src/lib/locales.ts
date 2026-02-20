export const DEFAULT_LOCALE = "en" as const;

export const APP_LOCALES = [DEFAULT_LOCALE, "es", "de", "ar"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

const APP_LOCALE_SET = new Set<string>(APP_LOCALES);

export const LOCALE_OPTIONS: ReadonlyArray<{ code: AppLocale; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Espanol" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "Arabic" },
];

export function isAppLocale(value: string): value is AppLocale {
  return APP_LOCALE_SET.has(value);
}

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}

export function getCurrencyForLocale(locale: AppLocale): string {
  switch (locale) {
    case "es":
    case "de":
      return "EUR";
    case "ar":
      return "AED";
    default:
      return "USD";
  }
}
