import { useEffect, useState, type ReactNode } from 'react';
import { useAuthStore } from '../../stores/authStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    } else {
      void useAuthStore.persist.rehydrate();
    }

    return unsubscribe;
  }, []);

  if (!isHydrated) return null;

  return <>{children}</>;
}