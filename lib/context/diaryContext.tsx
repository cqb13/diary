"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
export const DiaryContext = createContext({});

export const useDiaryContext = () => useContext(DiaryContext);

interface DiaryContextProviderProps {
  children: ReactNode;
}

export function DiaryContextProvider({
  children,
}: DiaryContextProviderProps): JSX.Element {
  const [currentDiaryId, setCurrentDiaryId] = useState<string | null>(null);

  return (
    <DiaryContext.Provider
      value={{
        currentDiaryId,
        setCurrentDiaryId: (newDiaryId: string | null) => {
          setCurrentDiaryId(newDiaryId);
        },
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
}
