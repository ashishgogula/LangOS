import { NextResponse } from "next/server";
import { APP_LOCALES } from "@/lib/locales";

export const runtime = "nodejs";

const REQUIRED_TARGET_LOCALES = ["es", "de", "ar"] as const;

export async function GET() {
  const hasRuntimeApiKey = Boolean(process.env.LINGODOTDEV_API_KEY);

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    configuredLocales: APP_LOCALES,
    hasRuntimeApiKey,
    requiredTargetLocales: REQUIRED_TARGET_LOCALES,
  });
}
