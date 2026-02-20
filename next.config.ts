import { withLingo } from "@lingo.dev/compiler/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default async function config(): Promise<NextConfig> {
  const lingoNextConfig = await withLingo(nextConfig, {
    sourceRoot: "src",
    sourceLocale: "en",
    targetLocales: ["es", "de", "ar"],
    localePersistence: {
      type: "cookie",
      config: {
        name: "locale",
        maxAge: 31536000,
      },
    },
    dev: {
      usePseudotranslator: true,
    },
  });

  return {
    ...lingoNextConfig,
    compiler: {
      ...lingoNextConfig.compiler,
      runAfterProductionCompile: async () => {
        // Runtime locale switching and dev translation stay enabled;
        // skip build-time remote translation generation when no API key is present.
      },
    },
  };
}
