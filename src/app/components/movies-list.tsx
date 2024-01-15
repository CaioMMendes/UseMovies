"use client";
import { MouseEventHandler, useEffect, useRef } from "react";
import { useFetchContext } from "../contexts/fetch-context";
import { Movie, useMoviesContext } from "../contexts/movies-context";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import useIntersectionObservertwo from "../hooks/useIntersectionObservertwo";
import { MovieOpenTypes } from "../page";
import ListLoading from "./list-Loading";
import ListError from "./list-error";
import MovieItem from "./movie-item";
import Button from "./button";

interface MovieListProps {
  rounded?: boolean;
  movies: Movie[];
  setIsMovieInfoOpen: React.Dispatch<React.SetStateAction<MovieOpenTypes>>;
}

const MoviesList = ({
  rounded = true,
  movies,
  setIsMovieInfoOpen,
}: MovieListProps) => {
  const loadMoreRef = useRef(null);

  const { isError, isLoading, search, moviesInfo } = useMoviesContext();
  const { fetchNextPageContext, isFetchingNextPage, isFetching } =
    useFetchContext();

  useIntersectionObservertwo({
    target: loadMoreRef,
    onIntersect: () => {
      if (moviesInfo.page < moviesInfo.totalPage) {
        fetchNextPageContext();
      }
    },
    enabled: moviesInfo.page < moviesInfo.totalPage,
  });

  // useEffect(() => {
  //   console.log(loadMoreRef);
  //   console.log(moviesInfo.page);
  //   console.log(moviesInfo.totalPage);
  //   if (isVisible && moviesInfo.page < moviesInfo.totalPage) {
  //     fetchNextPageContext();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [entry, loadMoreRef]);
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (moviesInfo.page < moviesInfo.totalPage) {
      fetchNextPageContext();
    }
  };
  if (isError) {
    return <ListError rounded={rounded} />;
  }
  if (isLoading) {
    return <ListLoading rounded={rounded} />;
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg bg-primary-3  ">
      <div
        className={`${
          rounded && "rounded-b-none rounded-t-lg bg-primary-3-opacity "
        } flex w-full flex-col rounded-b-lg bg-primary-3  p-2`}
      >
        {rounded ? (
          search !== "" ? (
            <p className="flex items-center gap-1 text-lg">
              Foram encontrados <strong> {moviesInfo.totalResults} </strong>{" "}
              filmes.
            </p>
          ) : (
            <p className="flex items-center gap-1 text-lg">
              Pesquise por algum filme.
            </p>
          )
        ) : (
          <p className="flex items-center gap-1 text-lg">
            Você possuí <strong> X </strong> filmes assistidos.
          </p>
        )}
      </div>
      <ul className="flex w-full flex-col gap-2 p-2">
        {movies.map((movie) => {
          return (
            <MovieItem
              movieId={movie.id}
              setIsMovieInfoOpen={setIsMovieInfoOpen}
              key={movie.id}
              movie={movie}
            />
          );
        })}
      </ul>
      <div ref={loadMoreRef} className={`flex flex-col gap-1`}>
        {isFetchingNextPage ? "Loading more..." : ""}
        <div>{isFetching && isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
      {moviesInfo.page < moviesInfo.totalPage && (
        <div className="flex w-full">
          <Button
            variant="button"
            className="w-full"
            onClick={handleButtonClick}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
