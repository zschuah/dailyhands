import {
  createContext,
  useContext,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useSSRLocalStorage } from "~/hooks/useSSRLocalStorage";

type AppContextType = {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
};

const NULL_CONTEXT: AppContextType = {
  score: 0,
  setScore: () => {},
};

const AppContext = createContext<AppContextType>(NULL_CONTEXT);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useSSRLocalStorage("score", 0);

  // Memoize the context value so it doesn't trigger accidental re-renders
  const contextValue = useMemo(() => ({ score, setScore }), [score]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
