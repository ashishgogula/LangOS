import { withLingo } from "@lingo.dev/compiler/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withLingo(nextConfig, {
  sourceLocale: "en",
  targetLocales: ["es", "de", "ar"],
});
