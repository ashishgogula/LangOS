"use client";

import Link from "next/link";
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

function getRuntimeCheckDescription(
  runtimeCheckLoaded: boolean,
  runtimeConfigured: boolean,
): string {
  if (!runtimeCheckLoaded) {
    return "Checking runtime translation API configuration...";
  }

  if (runtimeConfigured) {
    return "LINGODOTDEV_API_KEY is configured for runtime translation calls.";
  }

  return "Configure LINGODOTDEV_API_KEY before production launch.";
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
        description: getRuntimeCheckDescription(runtimeCheckLoaded, runtimeConfigured),
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
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Interactive playground</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Test runtime translation, formatting, and release checks in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="badge-neutral">Locale: {activeLocale.toUpperCase()}</span>
            <Link className="button-secondary" href="/guide">
              Open Guide
            </Link>
          </div>
        </div>
      </section>

      {readinessError ? (
        <p className="alert-warning rounded-lg p-3 text-sm">
          {readinessError}
        </p>
      ) : null}

      <ReadinessChecklist checkedAt={readiness?.checkedAt ?? null} checks={readinessChecks} />

      <section className="surface-card space-y-4 p-6 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Dynamic translation</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Translate user input to the current locale ({activeLocale.toUpperCase()}).
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            className="textarea-base"
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Enter text to translate"
            value={inputText}
          />

          <button className="button-primary" disabled={translateDisabled} onClick={handleTranslate} type="button">
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>

        {translationError ? (
          <p className="alert-error rounded-lg p-3 text-sm">
            {translationError}
          </p>
        ) : null}

        {translatedText ? (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Result</p>
            <p className="mt-2 text-sm text-zinc-800">{translatedText}</p>
          </div>
        ) : null}
      </section>

      <TranslationHistoryList items={historyItems} />

      <section className="surface-card space-y-4 p-6 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Locale formatting</h2>
          <p className="mt-1 text-sm text-zinc-600">Verify Intl currency and date output per locale.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Price</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">{formattedPrice}</p>
          </div>

          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Current date</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">{formattedDate}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
