import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Read initial state directly from matchMedia
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Event listener for the 'change' event
    const documentChangeHandler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Edge case: update state if the query changed between initialization and the effect running
    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches);
    }

    // Subscribe to the change event
    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Unsubscribe on unmount
    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query, matches]);

  return matches;
}