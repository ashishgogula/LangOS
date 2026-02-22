import { LingoProvider } from "@lingo.dev/compiler/react/next";
import LandingPageContent from "@/components/LandingPageContent";
import { DEFAULT_LOCALE } from "@/lib/locales";
import enCache from "@/lingo/cache/en.json";

type LocaleCacheFile = {
  entries: Record<string, string>;
};

const SOURCE_TRANSLATIONS = (enCache as LocaleCacheFile).entries;

export default function LandingPage() {
  return (
    <LingoProvider
      initialLocale={DEFAULT_LOCALE}
      initialTranslations={SOURCE_TRANSLATIONS}
      devWidget={{ enabled: false }}
    >
      <LandingPageContent />
    </LingoProvider>
  );
}
