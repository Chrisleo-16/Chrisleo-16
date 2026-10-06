import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";

/**
 * The home page ships in the main bundle; everything else is split, because a
 * first visitor almost always lands on the front page and scrolls.
 */
const BuildDetail = lazy(() => import("@/pages/BuildDetail"));
const LabPage = lazy(() => import("@/pages/LabPage"));
const NotesPage = lazy(() => import("@/pages/NotesPage"));
const NoteDetail = lazy(() => import("@/pages/NoteDetail"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const NowPage = lazy(() => import("@/pages/NowPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Holds the fold while a route chunk loads — no spinner, no layout shift. */
const RouteFallback = () => (
  <div className="min-h-[60svh]" role="status" aria-live="polite">
    <span className="sr-only">Loading</span>
  </div>
);

export default function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/builds/:slug" element={<BuildDetail />} />
              <Route path="/lab" element={<LabPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/notes/:slug" element={<NoteDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/now" element={<NowPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  );
}
