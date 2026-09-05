import { useEffect, useState } from "react";

const KEY = "lce-theme";

/**
 * Paper or ink. Two states, one word, no icon animation — the toggle is
 * metadata like everything else on the rail.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /**
   * Only an actual choice is remembered. Persisting on mount would silently
   * freeze whatever the OS happened to prefer on a visitor's first arrival.
   */
  const toggle = () => {
    setDark((d) => {
      try {
        localStorage.setItem(KEY, d ? "light" : "dark");
      } catch {
        /* private mode — the class still applies for this session */
      }
      return !d;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={`Switch to ${dark ? "paper" : "ink"} theme`}
      className={`meta-sm text-muted-foreground transition-colors hover:text-ink ${className}`}
    >
      {dark ? "Ink" : "Paper"}
    </button>
  );
}
