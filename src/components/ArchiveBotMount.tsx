import { Suspense, lazy, useEffect, useState } from "react";

/**
 * The assistant is its own chunk, fetched the first time anyone asks for it
 * from the status rail and not a moment earlier. Someone who just wants to
 * read never downloads it.
 */
const ArchiveBot = lazy(() => import("./ArchiveBot"));

export default function ArchiveBotMount() {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const arm = () => setArmed(true);
    window.addEventListener("archive:open", arm);
    return () => window.removeEventListener("archive:open", arm);
  }, []);

  if (!armed) return null;
  return (
    <Suspense fallback={null}>
      <ArchiveBot initialOpen />
    </Suspense>
  );
}
