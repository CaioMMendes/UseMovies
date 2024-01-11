"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";

interface FetchContextProps {
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  debounceFetch: string;
  setDebounceFetch: React.Dispatch<React.SetStateAction<string>>;
  isFetchingNextPage: boolean;
  setIsFetchingNextPage: React.Dispatch<React.SetStateAction<boolean>>;
  fetchNextPageContext: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
}

const FetchContext = createContext<FetchContextProps | undefined>(undefined);

interface FetchProviderProps {
  children: ReactNode;
}

export const FetchProvider: React.FC<FetchProviderProps> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [debounceFetch, setDebounceFetch] = useState<string>("");
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);

  const { fetchNextPage: fetchNextPageContext } = useInfiniteQuery({
    queryKey: [debounceFetch],
  });

  const contextValue: FetchContextProps = {
    isFetching,
    setIsFetching,
    isFetchingNextPage,
    setIsFetchingNextPage,
    fetchNextPageContext,
    debounceFetch,
    setDebounceFetch,
  };

  return (
    <FetchContext.Provider value={contextValue}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = (): FetchContextProps => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetchContext must be used within a FetchProvider");
  }
  return context;
};
