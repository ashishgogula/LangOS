"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "langos:theme:v1";

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (isThemeMode(storedTheme)) {
      return storedTheme;
    }
  } catch {
    // Ignore storage access failures.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document === "undefined") {
      return "light";
    }

    const htmlTheme = document.documentElement.dataset.theme;
    return isThemeMode(htmlTheme) ? htmlTheme : getPreferredTheme();
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const switchTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage write failures.
    }
  };

  const nextLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      className="theme-toggle h-8 px-2.5 text-xs"
      onClick={switchTheme}
      type="button"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span className="hidden sm:inline">{nextLabel}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 14.8a8.8 8.8 0 1 1-11.3-11 7.2 7.2 0 0 0 11.3 11Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
