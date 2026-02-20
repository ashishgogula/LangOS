"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/guide", label: "Guide" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="nav-shell sticky top-0 z-20 backdrop-blur-xl">
      <div className="shell-container flex h-14 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link className="nav-brand flex items-center gap-2 text-sm font-semibold" href="/">
            <span className="nav-dot inline-flex h-2 w-2 rounded-full" />
            LangOS
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  className={`nav-link px-3 py-1.5 text-sm ${active ? "nav-link-active" : ""}`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
