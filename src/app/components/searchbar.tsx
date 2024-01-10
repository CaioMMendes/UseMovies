"use client";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Input from "./Input";
import { useDebounce } from "../helpers/use-debounce";
import { useMoviesContext } from "../contexts/movies-context";
import getMovies from "../fetch/get-movies";
import { useInfiniteQuery, useQuery } from "react-query";

const Searchbar = () => {
  const { setMovies, setIsError, setIsLoading, setSearch, setMoviesInfo } =
    useMoviesContext();
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

    onSuccess: (data) => {
      console.log("data", data);
      // setSearch(debounceSearch);
      // if (data.movies.results) {
      //   setMovies(data.movies.results);
      //   setMoviesInfo({
      //     page: data.movies.page,
      //     totalPage: data.movies.total_pages,
      //     totalResults: data.movies.total_results,
      //   });
      // }
    },
    queryFn: async () => await getMovies({ search: debounceSearch }),
    getNextPageParam: (lastPage: any, pages) => {
      return lastPage.info.page + 1;
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
  return (
    <div className="flex w-full items-center">
      <Input
        placeholder="Busque por um filme ..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default Searchbar;
