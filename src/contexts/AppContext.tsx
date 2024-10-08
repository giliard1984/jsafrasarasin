// this context api is responsible for managing the main
// information related to the application
import { createContext, useState } from "react";

import type { Session, Question } from "@definitions/global";

const AppContextValue = {
  // loading: false,
  // error: null as Error | null,
  session: undefined as Session | undefined,
  activeQuestionPool: {} as Question | {},
  setSession: (_value: Session) => {},
  setActiveQuestionPool: (_value: string) => {},
 };

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const AppContext = createContext(AppContextValue);

const AppProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | undefined>(); // this is the user's session
  const [activeQuestionPool, setActiveQuestionPool] = useState({});

  return (
    <AppContext.Provider
      value={{
        // loading,
        // error,
        session,
        setSession,
        activeQuestionPool,
        setActiveQuestionPool
      }}
    >
      {children}
    </AppContext.Provider>
  );
 };
 
 export { AppContext, AppProvider };
