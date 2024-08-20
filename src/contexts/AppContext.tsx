// this context api is responsible for managing the main
// information related to the application
import { createContext, useState } from "react";
// import useFetch from "@hooks/useFetch";

// import type { Video } from "@definitions/global";

const AppContextValue = {
  // loading: false,
  // error: null as Error | null,
  activeQuestionPool: {} as any,
  setActiveQuestionPool: (_value: string) => {},
 };

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const AppContext = createContext(AppContextValue);

const AppProvider = ({ children }: Props) => {
  const [activeQuestionPool, setActiveQuestionPool] = useState({});

  return (
    <AppContext.Provider
      value={{
        // loading,
        // error,
        activeQuestionPool,
        setActiveQuestionPool
      }}
    >
      {children}
    </AppContext.Provider>
  );
 };
 
 export { AppContext, AppProvider };
