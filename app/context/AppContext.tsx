import { useLocalStorage } from "@uidotdev/usehooks";
import {
  createContext,
  useContext,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";

type AppContextType = {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
};

const AppContext = createContext<AppContextType>(null!);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useLocalStorage("score", 0);

  // Memoize the context value so it doesn't trigger accidental re-renders
  const contextValue = useMemo(() => ({ score, setScore }), [score]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
