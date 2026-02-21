import type { AppLocale } from "@/lib/locales";

const REQUEST_TIMEOUT_MS = 20000;

type TranslateApiResponse = {
  translatedText?: string;
  error?: string;
};

export async function translateText(
  text: string,
  targetLocale: AppLocale,
  sourceLocale: AppLocale,
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, targetLocale, sourceLocale }),
      signal: controller.signal,
    });

    const payload = (await response.json()) as TranslateApiResponse;

    if (!response.ok || !payload.translatedText) {
      throw new Error(payload.error ?? "Translation failed.");
    }

    return payload.translatedText;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Translation request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
