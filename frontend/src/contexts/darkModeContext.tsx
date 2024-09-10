import { createContext, ReactNode, useState } from "react";

interface DarkModeType {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

const DarkModeContext = createContext<DarkModeType>({} as DarkModeType);

const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false);

  const value = { dark, setDark };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext };

export default DarkModeProvider;
