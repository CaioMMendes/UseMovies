"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Infos {
  page: number;
  totalPage: number;
  totalResults: number;
}
interface MoviesContextProps {
  movies: Movie[] | [];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  moviesInfo: Infos;
  setMoviesInfo: React.Dispatch<React.SetStateAction<Infos>>;
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [moviesInfo, setMoviesInfo] = useState<Infos>({
    page: 0,
    totalPage: 0,
    totalResults: 0,
  });
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const storageMovies = localStorage.getItem("movies")!;
  //     if (Array.isArray(JSON.parse(storageMovies))) {
  //       setMovies(JSON.parse(storageMovies));
  //     }
  //     setIsLoading(false);
  //   }, []);

  const contextValue: MoviesContextProps = {
    movies,
    setMovies,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    search,
    setSearch,
    moviesInfo,
    setMoviesInfo,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = (): MoviesContextProps => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return context;
};
