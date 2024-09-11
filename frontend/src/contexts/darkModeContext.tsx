import { createContext, ReactNode, useEffect, useState } from "react";
import { Dark, useDarkState } from "../store/darkStore";

interface DarkModeType {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

const DarkModeContext = createContext<DarkModeType>({} as DarkModeType);

const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkStorage, setDarkStorage] = useDarkState();
  const [dark, setDark] = useState((JSON.parse(darkStorage) as Dark).dark);

  useEffect(() => {
    setDarkStorage({ dark });
  }, [dark]);

  const value = { dark, setDark };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext };

export default DarkModeProvider;
