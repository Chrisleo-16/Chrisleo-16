import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import StatusRail from "./StatusRail";
import ArchiveBotMount from "@/components/ArchiveBotMount";

/** Restores scroll on route change, and honours a hash if one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="grain relative min-h-screen">
      <ScrollManager />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      {/* The rail is fixed, so the last block in flow owns the clearance. */}
      <div className="pb-[var(--rail-h)]">
        <Footer />
      </div>
      <StatusRail />
      <ArchiveBotMount />
    </div>
  );
}
