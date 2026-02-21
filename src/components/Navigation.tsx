import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  return (
    <header className="nav-shell">
      <div className="shell nav-inner">
        <nav aria-label="Primary" className="nav-links">
          <Link className="brand-link" href="/">
            <span className="brand-mark" aria-hidden="true" />
            LangOS
          </Link>
          <span className="nav-divider" aria-hidden="true">
            |
          </span>
          <Link className="nav-link" href="/playground">
            Playground
          </Link>
          <span className="nav-divider" aria-hidden="true">
            |
          </span>
          <Link className="nav-link" href="/developers">
            Developers
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
