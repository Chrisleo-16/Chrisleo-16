import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Navigation that understands both routes and in-page anchors, so "/#journey"
 * works identically from the home page and from a note three routes deep.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (href: string) => {
      const [rawPath, hash] = href.split("#");
      const path = rawPath || "/";

      if (hash && pathname === path) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `${path}#${hash}`);
        return;
      }
      navigate(href);
    },
    [navigate, pathname],
  );
}
