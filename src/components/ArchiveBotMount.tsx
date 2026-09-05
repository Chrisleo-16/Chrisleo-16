import { Suspense, lazy, useEffect, useState } from "react";

/**
 * The assistant pulls in the Supabase client, which is far too much weight to
 * ship to someone who just wants to read. It is fetched the first time anyone
 * asks for it from the status rail, and not a moment earlier.
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
