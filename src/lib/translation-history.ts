import type { AppLocale } from "@/lib/locales";

const STORAGE_KEY = "langos:translation-history:v1";
const HISTORY_LIMIT = 8;

type TranslationStatus = "success" | "error";

type StoredTranslationHistoryV1 = {
  items: TranslationHistoryEntry[];
  version: 1;
};

export type TranslationHistoryEntry = {
  createdAt: string;
  id: string;
  input: string;
  locale: AppLocale;
  output: string;
  status: TranslationStatus;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function safeParseHistory(value: string): TranslationHistoryEntry[] {
  try {
    const parsed = JSON.parse(value) as Partial<StoredTranslationHistoryV1>;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.items)) {
      return [];
    }

    return parsed.items.filter((item) => {
      return (
        typeof item?.id === "string" &&
        typeof item?.createdAt === "string" &&
        typeof item?.input === "string" &&
        typeof item?.output === "string" &&
        typeof item?.locale === "string" &&
        (item?.status === "success" || item?.status === "error")
      );
    });
  } catch {
    return [];
  }
}

export function loadTranslationHistory(): TranslationHistoryEntry[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    return safeParseHistory(raw);
  } catch {
    return [];
  }
}

export function saveTranslationHistory(items: TranslationHistoryEntry[]): void {
  if (!canUseStorage()) {
    return;
  }

  const payload: StoredTranslationHistoryV1 = {
    items: items.slice(0, HISTORY_LIMIT),
    version: 1,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures (private mode / quota / disabled storage)
  }
}

export function appendTranslationHistory(
  nextItem: TranslationHistoryEntry,
): TranslationHistoryEntry[] {
  const current = loadTranslationHistory();
  const next = [nextItem, ...current].slice(0, HISTORY_LIMIT);
  saveTranslationHistory(next);
  return next;
}
