import { NextResponse } from "next/server";
import { LingoDotDevEngine } from "lingo.dev/sdk";
import { DEFAULT_LOCALE, isAppLocale } from "@/lib/locales";

export const runtime = "nodejs";

const TRANSLATION_TIMEOUT_MS = 15000;
const translationCache = new Map<string, string>();

type TranslateRequest = {
  text?: unknown;
  targetLocale?: unknown;
  sourceLocale?: unknown;
};

function createCacheKey(
  text: string,
  sourceLocale: string,
  targetLocale: string,
): string {
  return `${sourceLocale}->${targetLocale}::${text}`;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Translation timed out."));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export async function POST(request: Request) {
  const bodyPromise = request.json() as Promise<TranslateRequest>;
  const apiKey = process.env.LINGO_API_KEY;

  let body: TranslateRequest;
  try {
    body = await bodyPromise;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const rawTargetLocale =
    typeof body.targetLocale === "string" ? body.targetLocale : DEFAULT_LOCALE;
  const rawSourceLocale =
    typeof body.sourceLocale === "string" ? body.sourceLocale : DEFAULT_LOCALE;

  if (!text) {
    return NextResponse.json({ error: "Text is required." }, { status: 400 });
  }

  if (!isAppLocale(rawTargetLocale) || !isAppLocale(rawSourceLocale)) {
    return NextResponse.json({ error: "Unsupported locale." }, { status: 400 });
  }

  if (rawSourceLocale === rawTargetLocale) {
    return NextResponse.json({ translatedText: text });
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "LINGO_API_KEY is not configured." },
      { status: 503 },
    );
  }

  const cacheKey = createCacheKey(text, rawSourceLocale, rawTargetLocale);
  const cachedResult = translationCache.get(cacheKey);
  if (cachedResult) {
    return NextResponse.json({ translatedText: cachedResult });
  }

  try {
    const engine = new LingoDotDevEngine({ apiKey });

    const translatedText = await withTimeout(
      engine.localizeText(text, {
        sourceLocale: rawSourceLocale,
        targetLocale: rawTargetLocale,
        fast: true,
      }),
      TRANSLATION_TIMEOUT_MS,
    );

    translationCache.set(cacheKey, translatedText);

    return NextResponse.json({ translatedText });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to translate at the moment.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
