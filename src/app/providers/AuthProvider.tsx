import { useEffect, useState, type ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // TODO: Phase 7 - Connect to Zustand store's persist hook
    // Example: useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));
    setIsHydrated(true); // Stubbed completion
  }, []);

  if (!isHydrated) return null; // Prevents UI flash

  return <>{children}</>;
}