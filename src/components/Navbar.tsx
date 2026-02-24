import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Projects",   href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact",    href: "#contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop: floating pill navbar */}
      <motion.div
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-full border border-border bg-background/90 backdrop-blur-xl"
          style={{ boxShadow: scrolled ? "0 8px 32px hsl(var(--foreground) / 0.08)" : "none" }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-3 py-1.5 text-sm font-bold text-foreground mr-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.97 }}
          >
            LC
          </motion.button>

          {/* Divider */}
          <div className="w-px h-4 bg-border mr-2" />

          {/* Links */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  background: isActive ? "hsl(var(--secondary))" : "transparent",
                }}
                whileHover={{ color: "hsl(var(--foreground))", background: "hsl(var(--secondary))" }}
                transition={{ duration: 0.15 }}
              >
                {link.name}
              </motion.button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-4 bg-border ml-2 mr-2" />

          {/* Right side */}
          <ThemeToggle />
          <motion.button
            onClick={() => scrollTo("#contact")}
            className="ml-1 px-4 py-1.5 rounded-full text-sm font-semibold bg-foreground text-background"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            whileHover={{ opacity: 0.85, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Hire Me
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile: top bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-b border-border"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-5 py-3.5 flex items-center justify-between">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-base font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            whileHover={{ opacity: 0.7 }}
          >
            Leo Chrisben
          </motion.button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-lg border border-border bg-foreground/10 flex items-center justify-center text-foreground"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden bg-background border-t border-border"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
                <div className="mt-2 pt-2 border-t border-border">
                  <motion.button
                    onClick={() => scrollTo("#contact")}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-foreground text-background"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Hire Me
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
