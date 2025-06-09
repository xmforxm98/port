import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleResize = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleResize);
      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    } 
    // Older browsers
    else {
      mediaQuery.addListener(handleResize);
      return () => {
        mediaQuery.removeListener(handleResize);
      };
    }
  }, [query]);

  return matches;
}