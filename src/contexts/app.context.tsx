import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "src/utils/auth";

interface AppContextInterface {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  enable: boolean;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  openModal: false,
  setOpenModal: () => {},
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  setEnable: () => null,
  enable: false,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
  children,
  defaultValue = initialAppContext,
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValue.isAuthenticated
  );
  const [enable, setEnable] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        openModal,
        setOpenModal,
        isAuthenticated,
        setIsAuthenticated,
        setEnable,
        enable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
