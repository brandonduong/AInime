import { useSyncExternalStore } from "react";

export type Dark = {
  dark: boolean;
};

export function useDarkState() {
  const getSnapshot = () => {
    return localStorage.getItem("dark") || JSON.stringify({ dark: false });
  };

  const subscribe = (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  };

  function setDark(newValue: Dark) {
    window.localStorage.setItem("dark", JSON.stringify(newValue));
    // Manually dispatch a storage event to trigger the subscribe function on the current window as well.
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "dark",
        newValue: JSON.stringify(newValue),
      })
    );
  }

  // Set the initial value if not already set.
  if (!localStorage.getItem("dark")) {
    const initialDark: Dark = { dark: false };
    localStorage.setItem("dark", JSON.stringify(initialDark));
  }

  const dark = useSyncExternalStore(subscribe, getSnapshot);

  return [dark, setDark] as const;
}
