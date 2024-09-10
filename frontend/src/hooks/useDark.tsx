import { useContext } from "react";
import { DarkModeContext } from "../contexts/darkModeContext";
export function useDark() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDark must be used within a DarkModeProvider");
  return context;
}
