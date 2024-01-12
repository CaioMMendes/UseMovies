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
    moviesInfo,
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
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [debounceSearch],

    onSuccess: (data: InfiniteData<PageProps>) => {
      setSearch(debounceSearch);
      setDebounceFetch(debounceSearch);
      if (data.pages.length > 0) {
        data.pages.map((page, index) => {
          if (index === 0) return setMovies([...page.movies.results]);
          return setMovies((movies) => [...movies, ...page.movies.results]);
        });
        setMoviesInfo({
          totalPage: data.pages[0].movies.total_pages,
          totalResults: data.pages[0].movies.total_results,
          page: data.pages.length,
        });
      }
    },
    queryFn: async ({ pageParam = 1 }) =>
      await getMovies({ search: debounceSearch, pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.movies.page + 1;
    },
  });

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
