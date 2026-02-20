import { DEFAULT_LOCALE, isAppLocale } from "../lib/locales";

const STORAGE_KEY_V1 = "langos:locale:v1";
const LEGACY_STORAGE_KEY = "langos-locale";
const COOKIE_NAME = "locale";
const COOKIE_MAX_AGE = 31536000;

function readCookieLocale(): string | null {
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match?.[1] ?? null;
}

export function getClientLocale(): string {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY_V1);
    if (storedLocale && isAppLocale(storedLocale)) {
      return storedLocale;
    }

    const legacyLocale = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyLocale && isAppLocale(legacyLocale)) {
      window.localStorage.setItem(STORAGE_KEY_V1, legacyLocale);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return legacyLocale;
    }
  } catch {
    // Ignore storage access errors in private mode or restricted contexts.
  }

  const cookieLocale = readCookieLocale();
  if (cookieLocale && isAppLocale(cookieLocale)) {
    return cookieLocale;
  }

  return DEFAULT_LOCALE;
}

export function persistLocale(locale: string): void {
  if (typeof window === "undefined" || !isAppLocale(locale)) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY_V1, locale);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore storage write failures (quota / private mode / blocked storage).
  }

  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}`;
}
