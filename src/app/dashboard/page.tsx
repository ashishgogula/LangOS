"use client";

import { useEffect, useMemo, useState } from "react";
import { useLingoContext } from "@lingo.dev/compiler/react";
import ReadinessChecklist, {
  type ReleaseCheck,
} from "@/components/dashboard/ReadinessChecklist";
import TranslationHistoryList from "@/components/dashboard/TranslationHistoryList";
import {
  appendTranslationHistory,
  loadTranslationHistory,
  type TranslationHistoryEntry,
} from "@/lib/translation-history";
import {
  APP_LOCALES,
  DEFAULT_LOCALE,
  getCurrencyForLocale,
  isAppLocale,
  type AppLocale,
} from "@/lib/locales";
import { translateText } from "@/lib/lingo";

const SAMPLE_PRICE = 1250000.5;

type ReleaseReadinessPayload = {
  checkedAt: string;
  configuredLocales: string[];
  hasRuntimeApiKey: boolean;
  requiredTargetLocales: string[];
};

function createHistoryId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function DashboardPage() {
  const { locale } = useLingoContext();
  const activeLocale: AppLocale = isAppLocale(locale) ? locale : DEFAULT_LOCALE;

  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState("");

  const [historyItems, setHistoryItems] = useState<TranslationHistoryEntry[]>([]);
  const [readiness, setReadiness] = useState<ReleaseReadinessPayload | null>(null);
  const [readinessError, setReadinessError] = useState("");

  useEffect(() => {
    setHistoryItems(loadTranslationHistory());
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchReadiness(): Promise<void> {
      try {
        const response = await fetch("/api/release-readiness", {
          cache: "no-store",
        });
        const payload = (await response.json()) as ReleaseReadinessPayload;

        if (!active) {
          return;
        }

        if (!response.ok) {
          setReadinessError("Unable to load release readiness checks.");
          return;
        }

        setReadiness(payload);
        setReadinessError("");
      } catch {
        if (!active) {
          return;
        }

        setReadinessError("Unable to load release readiness checks.");
      }
    }

    fetchReadiness();

    return () => {
      active = false;
    };
  }, []);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat(activeLocale, {
      style: "currency",
      currency: getCurrencyForLocale(activeLocale),
      maximumFractionDigits: 2,
    }).format(SAMPLE_PRICE);
  }, [activeLocale]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(activeLocale, {
      dateStyle: "full",
    }).format(new Date());
  }, [activeLocale]);

  const readinessChecks = useMemo<ReleaseCheck[]>(() => {
    const configuredLocales = readiness?.configuredLocales ?? [...APP_LOCALES];
    const requiredTargetLocales = readiness?.requiredTargetLocales ?? ["es", "de", "ar"];
    const runtimeConfigured = readiness?.hasRuntimeApiKey ?? false;
    const runtimeCheckLoaded = readiness !== null;

    const hasRequiredLocales = requiredTargetLocales.every((localeCode) =>
      configuredLocales.includes(localeCode),
    );

    const hasRtlCoverage = configuredLocales.includes("ar");
    const hasRecentSuccess = historyItems.some((item) => item.status === "success");

    return [
      {
        blocking: true,
        description: `Expected target locales: ${requiredTargetLocales.join(", ")}. Configured locales: ${configuredLocales.join(", ")}.`,
        id: "locale-coverage",
        label: "Locale coverage",
        passed: hasRequiredLocales,
      },
      {
        blocking: true,
        description: "Arabic support is available for RTL layout validation.",
        id: "rtl",
        label: "RTL support",
        passed: hasRtlCoverage,
      },
      {
        blocking: runtimeCheckLoaded,
        description: runtimeCheckLoaded
          ? runtimeConfigured
          ? "LINGODOTDEV_API_KEY is configured for runtime translation calls."
          : "Configure LINGODOTDEV_API_KEY before production launch."
          : "Checking runtime translation API configuration...",
        id: "runtime-translation",
        label: "Runtime translation API",
        passed: runtimeConfigured,
      },
      {
        blocking: false,
        description: hasRecentSuccess
          ? "At least one successful runtime translation was recorded."
          : "Run at least one successful translation smoke test.",
        id: "smoke-test",
        label: "Smoke test",
        passed: hasRecentSuccess,
      },
    ];
  }, [historyItems, readiness]);

  const translateDisabled = isTranslating || inputText.trim().length === 0;

  const handleTranslate = async () => {
    const text = inputText.trim();
    if (!text) {
      return;
    }

    setIsTranslating(true);
    setTranslationError("");

    try {
      const result = await translateText(text, activeLocale);
      setTranslatedText(result);

      setHistoryItems(
        appendTranslationHistory({
          createdAt: new Date().toISOString(),
          id: createHistoryId(),
          input: text,
          locale: activeLocale,
          output: result,
          status: "success",
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to translate right now.";
      setTranslationError(message);
      setTranslatedText("");

      setHistoryItems(
        appendTranslationHistory({
          createdAt: new Date().toISOString(),
          id: createHistoryId(),
          input: text,
          locale: activeLocale,
          output: message,
          status: "error",
        }),
      );
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="surface-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Runtime translation, locale formatting, and release checks for LangOS.
        </p>
      </section>

      {readinessError ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          {readinessError}
        </p>
      ) : null}

      <ReadinessChecklist
        checkedAt={readiness?.checkedAt ?? null}
        checks={readinessChecks}
      />

      <section className="surface-card space-y-4 p-6 sm:p-8">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Dynamic Translation</h2>
          <p className="mt-1 text-sm text-slate-600">
            Translate user input to the active locale ({activeLocale}).
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            className="min-h-28 w-full resize-y rounded-md border border-slate-300 p-3 outline-none transition focus:border-slate-400"
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Enter text to translate"
            value={inputText}
          />

          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={translateDisabled}
            onClick={handleTranslate}
            type="button"
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>

        {translationError ? (
          <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {translationError}
          </p>
        ) : null}

        {translatedText ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Result
            </p>
            <p className="mt-2 text-sm text-slate-800">{translatedText}</p>
          </div>
        ) : null}
      </section>

      <TranslationHistoryList items={historyItems} />

      <section className="surface-card space-y-4 p-6 sm:p-8">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Formatting</h2>
          <p className="mt-1 text-sm text-slate-600">
            Locale-aware formatting using Intl APIs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Price
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{formattedPrice}</p>
          </div>

          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Current Date
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{formattedDate}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
