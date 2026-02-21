import { withLingo } from "@lingo.dev/compiler/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default async function config(): Promise<NextConfig> {
  const lingoNextConfig = await withLingo(nextConfig, {
    sourceRoot: "src",
    sourceLocale: "en",
    targetLocales: ["es", "de", "ar"],
    models: "lingo.dev",
    localePersistence: {
      type: "cookie",
      config: {
        name: "locale",
        maxAge: 31536000,
      },
    },
    dev: {
      usePseudotranslator: false,
    },
  });

  return {
    ...lingoNextConfig,
    compiler: {
      ...lingoNextConfig.compiler,
      runAfterProductionCompile: async () => {
        // Keep CI and local builds deterministic for this playground.
      },
    },
  };
}
