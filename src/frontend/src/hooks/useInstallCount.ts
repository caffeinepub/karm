import { useState } from "react";

/**
 * Local install count hook — starts at 62, increments per session click.
 * No backend persistence since the backend has no install count methods.
 */
export function useInstallCount() {
  const [installCount, setInstallCount] = useState(62);

  const increment = () => {
    setInstallCount((prev) => prev + 1);
  };

  return {
    installCount,
    isLoading: false,
    increment,
    isIncrementing: false,
  };
}
