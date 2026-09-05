import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

/**
 * The archive uses two surfaces (paper / ink), one hairline rule weight,
 * and exactly one accent — the red annotation pen. Nothing else.
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--rule))",
        input: "hsl(var(--rule))",
        ring: "hsl(var(--ink))",
        background: "hsl(var(--paper))",
        foreground: "hsl(var(--ink))",
        rule: "hsl(var(--rule))",
        paper: "hsl(var(--paper))",
        ink: "hsl(var(--ink))",
        raised: "hsl(var(--raised))",
        annotate: "hsl(var(--annotate))",
        primary: { DEFAULT: "hsl(var(--ink))", foreground: "hsl(var(--paper))" },
        secondary: { DEFAULT: "hsl(var(--raised))", foreground: "hsl(var(--ink))" },
        muted: { DEFAULT: "hsl(var(--raised))", foreground: "hsl(var(--muted-ink))" },
        accent: { DEFAULT: "hsl(var(--annotate))", foreground: "hsl(var(--paper))" },
        card: { DEFAULT: "hsl(var(--raised))", foreground: "hsl(var(--ink))" },
        popover: { DEFAULT: "hsl(var(--raised))", foreground: "hsl(var(--ink))" },
        destructive: { DEFAULT: "hsl(var(--annotate))", foreground: "hsl(var(--paper))" },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        story: ["var(--font-story)"],
      },
      fontSize: {
        // Editorial display scale — fluid, never scroll-jacked
        "display-xl": ["clamp(2.35rem, min(6.8vw, 9vh), 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5.6vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3.6vw, 3rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.35rem, 2.3vw, 1.9rem)", { lineHeight: "1.14", letterSpacing: "-0.02em" }],
        meta: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
        "meta-sm": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.2em" }],
      },
      maxWidth: { measure: "62ch", "measure-sm": "48ch" },
      borderRadius: { lg: "2px", md: "2px", sm: "2px" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "rule-draw": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: { archive: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
