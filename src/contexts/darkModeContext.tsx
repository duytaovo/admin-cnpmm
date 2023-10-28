import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "src/utils/auth";

interface AppContextInterface {
  setEnable: React.Dispatch<React.SetStateAction<string>>;
  enable: string;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  setEnable: () => null,
  enable: "false",
});

const initialAppContext = getInitialAppContext();

export const DarkModeContext =
  createContext<AppContextInterface>(initialAppContext);

export const DarkModeProvider = ({
  children,
  defaultValue = initialAppContext,
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [enable, setEnable] = useState<string>(
    localStorage.getItem("enable") || "false"
  );

  return (
    <DarkModeContext.Provider
      value={{
        setEnable,
        enable,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
