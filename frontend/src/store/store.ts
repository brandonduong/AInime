import { useSyncExternalStore } from "react";
import { History } from "../components/Game/AnimeMode";

export function useHistoryState() {
  const getSnapshot = () => {
    return (
      localStorage.getItem("history") ||
      JSON.stringify({ anime: {}, rating: {}, title: {} })
    );
  };

  const subscribe = (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  };

  function setHistory(newValue: History) {
    window.localStorage.setItem("history", JSON.stringify(newValue));
    // Manually dispatch a storage event to trigger the subscribe function on the current window as well.
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "history",
        newValue: JSON.stringify(newValue),
      })
    );
  }

  // Set the initial value if not already set.
  if (!localStorage.getItem("history")) {
    const initialHistory: History = { anime: {}, rating: {}, title: {} };
    localStorage.setItem("history", JSON.stringify(initialHistory));
  }

  const history = useSyncExternalStore(subscribe, getSnapshot);

  return [history, setHistory] as const;
}
