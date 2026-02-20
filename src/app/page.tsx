"use client";

import { useState, useEffect } from "react";
import { translateText } from "@/lib/lingo";

export default function DashboardPage() {
  const [locale, setLocale] = useState("en");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lingo-locale") || "en";
    setLocale(saved);
  }, []);

  const handleTranslate = async () => {
    if (!textToTranslate) return;
    setIsTranslating(true);
    try {
      const result = await translateText(textToTranslate, locale);
      setTranslatedText(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  // Demo values for formatting
  const demoCurrency = 1250000.50;
  const demoDate = new Date();

  // Safe formatting helpers that fall back gracefully
  const formattedCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: locale === "es" ? "EUR" : locale === "ar" ? "AED" : locale === "de" ? "EUR" : "USD",
  }).format(demoCurrency);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(demoDate);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynamic Translation Demo */}
        <section className="bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Dynamic Translation</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Test runtime translation using the Lingo MCP/SDK for dynamic content.
          </p>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
              placeholder="Enter text to translate..."
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
            <button
              onClick={handleTranslate}
              disabled={isTranslating || !textToTranslate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isTranslating ? "Translating..." : `Translate to ${locale.toUpperCase()}`}
            </button>

            {translatedText && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800/30">
                <span className="block text-xs uppercase font-semibold mb-1 opacity-70">Result</span>
                {translatedText}
              </div>
            )}
          </div>
        </section>

        {/* Formatting Demo */}
        <section className="bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Formatting Demo</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Intl APIs formatting based on the current active locale (<span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">{locale}</span>).
          </p>

          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Currency Format</div>
              <div className="text-2xl font-semibold">{formattedCurrency}</div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-800 w-full" />

            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date Format</div>
              <div className="text-lg font-medium">{formattedDate}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
