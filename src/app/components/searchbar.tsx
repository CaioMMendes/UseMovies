"use client";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import Input from "./Input";
import { useDebounce } from "../helpers/use-debounce";
import { Infos, Movie, useMoviesContext } from "../contexts/movies-context";
import getMovies from "../fetch/get-movies";
import { InfiniteData, useInfiniteQuery, useQuery } from "react-query";
import { useFetchContext } from "../contexts/fetch-context";

export interface PageProps {
  status: number;
  message: string;
  movies: {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
  };
}

const Searchbar = () => {
  const {
    setMovies,
    setIsError,
    setIsLoading,
    setSearch,
    setMoviesInfo,
    setIsMovieInfoOpen,
  } = useMoviesContext();
  const {
    setIsFetching,
    setIsFetchingNextPage,
    fetchNextPageContext,
    setDebounceFetch,
  } = useFetchContext();
  const [searchInput, setSearchInput] = useState("");

  const debounceSearch = useDebounce(searchInput);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const {
    data: moviesData,
    isError: moviesIsError,
    isLoading: moviesIsLoading,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [debounceSearch],
    //todo usando onsuccess ele não roda quando ta em cache
    //todo o onsuccess só executa quando realiza uma requisição
    onSuccess: (data: InfiniteData<PageProps>) => {
      // setSearch(debounceSearch);
      // setDebounceFetch(debounceSearch);
      // if (data.pages[0].movies) {
      //   data.pages.map((page, index) => {
      //     if (index === 0) return setMovies([...page.movies.results]);
      //     return setMovies((movies) => [...movies, ...page.movies.results]);
      //   });
      //   // console.log(data.pages.flatMap((array) => array));
      //   setMoviesInfo({
      //     totalPage: data.pages[0].movies.total_pages,
      //     totalResults: data.pages[0].movies.total_results,
      //     page: data.pages.length,
      //   });
      // }
    },
    queryFn: async ({ pageParam = 1 }) =>
      await getMovies({ search: debounceSearch, pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.movies.page + 1;
    },
  });

  useEffect(() => {
    if (moviesIsLoading) return;
    setSearch(debounceSearch);
    setDebounceFetch(debounceSearch);
    if (moviesData) {
      if (moviesData.pages[0].movies) {
        moviesData.pages.map((page, index) => {
          if (index === 0) return setMovies([...page.movies.results]);
          return setMovies((movies) => [...movies, ...page.movies.results]);
        });
        // console.log(moviesData.pages.flatMap((array) => array));
        setMoviesInfo({
          totalPage: moviesData.pages[0].movies.total_pages,
          totalResults: moviesData.pages[0].movies.total_results,
          page: moviesData.pages.length,
        });
      }
    }
    setIsMovieInfoOpen((isMovieInfoOpen) => {
      return { ...isMovieInfoOpen, isOpen: false };
    });
    //eslint-disable-next-line
  }, [debounceSearch, moviesIsLoading, isFetching, isFetchingNextPage]);

  if (moviesIsLoading) {
    setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  if (moviesIsError) {
    setIsError(true);
  } else {
    setIsError(false);
  }
  if (isFetching) setIsFetching(true);
  if (!isFetching) setIsFetching(false);
  if (isFetchingNextPage) setIsFetchingNextPage(true);
  if (!isFetchingNextPage) setIsFetchingNextPage(false);
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    fetchNextPageContext();
  };

  return (
    <div className="flex w-full items-center">
      <Input
        placeholder="Busque por um filme ..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {/* <div>
        <button onClick={handleButtonClick}>Load More</button>
      </div>
      <div>{isFetching && isFetchingNextPage ? "Fetching..." : null}</div> */}
    </div>
  );
};

export default Searchbar;
