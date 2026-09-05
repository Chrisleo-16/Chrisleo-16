import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_ORDER, getLens, type Lens, type SectionKey } from "@/content/lenses";

const KEY = "lce-lens";
const ANSWERED = "lce-lens-answered";

type LensValue = {
  lens: Lens | null;
  /** True once the reader has either chosen a lens or waved the question away. */
  answered: boolean;
  /** Choose a lens (or the same one again to drop it). Always marks answered. */
  setLens: (key: string | null) => void;
  /** Dismiss without choosing — "show me everything". */
  reveal: () => void;
  order: SectionKey[];
  isSpotlit: (section: SectionKey) => boolean;
  noteFor: (section: SectionKey, fallback: string) => string;
};

const FALLBACK: LensValue = {
  lens: null,
  answered: true,
  setLens: () => {},
  reveal: () => {},
  order: DEFAULT_ORDER,
  isSpotlit: () => false,
  noteFor: (_s, fallback) => fallback,
};

const LensContext = createContext<LensValue | null>(null);

/**
 * Holds the reader's chosen lens and whether the question has been put to them
 * yet. Kept in sessionStorage rather than localStorage — this is a reading
 * preference for one visit, not a profile.
 */
export function LensProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const fromUrl = new URLSearchParams(window.location.search).get("lens");
    if (fromUrl) return fromUrl;
    try {
      return sessionStorage.getItem(KEY);
    } catch {
      return null;
    }
  });

  const [answered, setAnswered] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    if (new URLSearchParams(window.location.search).has("lens")) return true;
    try {
      return sessionStorage.getItem(ANSWERED) === "1";
    } catch {
      return true;
    }
  });

  const lens = useMemo(() => getLens(key), [key]);

  useEffect(() => {
    try {
      if (lens) sessionStorage.setItem(KEY, lens.key);
      else sessionStorage.removeItem(KEY);
      if (answered) sessionStorage.setItem(ANSWERED, "1");
    } catch {
      /* private mode — the choice just won't survive a reload */
    }
  }, [lens, answered]);

  const setLens = useCallback((next: string | null) => {
    setAnswered(true);
    setKey((current) => (current === next ? null : next));
  }, []);

  const reveal = useCallback(() => setAnswered(true), []);

  /**
   * A lens that reorders can never drop a section — anything it forgets to
   * mention is appended in its default position. A lens with `focus` is the
   * deliberate exception: the reader asked for the short path, so they get it.
   */
  const order = useMemo<SectionKey[]>(() => {
    if (!lens) return DEFAULT_ORDER;
    if (lens.focus) return lens.focus;
    if (!lens.order) return DEFAULT_ORDER;
    const listed = lens.order;
    return [...listed, ...DEFAULT_ORDER.filter((k) => !listed.includes(k))];
  }, [lens]);

  const value = useMemo<LensValue>(
    () => ({
      lens,
      answered,
      setLens,
      reveal,
      order,
      isSpotlit: (section) => Boolean(lens?.spotlight.includes(section)),
      noteFor: (section, fallback) => lens?.notes?.[section] ?? fallback,
    }),
    [lens, answered, setLens, reveal, order],
  );

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

export function useLens(): LensValue {
  // Outside the provider the archive simply reads in its default order.
  return useContext(LensContext) ?? FALLBACK;
}
