import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Motion rules for the archive:
 *   1. Every animation says something — arrival, sequence, or emphasis.
 *   2. Nothing loops, pulses or blinks.
 *   3. Reduced motion gets the document, immediately, with no layout difference.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Distance travelled on entry. 0 = fade only. */
  y?: number;
  once?: boolean;
  id?: string;
};

/** Standard scroll-in. Use for blocks, not for every element. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 18,
  once = true,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} id={id}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * A headline that arrives line by line, like it's being set rather than typed.
 * Each line is masked so the type slides up from behind the rule above it.
 *
 * Driven by CSS so the largest text on the page paints on the first frame
 * rather than waiting for hydration — and is never stuck invisible if a script
 * is slow. The reduced-motion rule in index.css collapses it to nothing.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // The padding keeps descenders inside the mask; the negative margin
        // gives the leading back so the lines still set tight.
        <span key={i} className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
          <span
            className={`enter-line block ${lineClassName ?? ""}`}
            style={{ animationDelay: `${delay + i * 0.09}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** CSS-driven fade-and-rise for above-the-fold blocks. */
export function EnterRise({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`enter-rise ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </Tag>
  );
}

/** A hairline that draws itself left-to-right when it enters. */
export function DrawRule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`h-px w-full bg-rule ${className}`} />;
  return (
    <motion.div
      className={`h-px w-full origin-left bg-rule ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    />
  );
}
