"use client";
import { useEffect } from "react";
import {
  WatchedMoviesTypes,
  useMoviesContext,
} from "../contexts/movies-context";
import MovieItem from "./movie-item";

const MoviesWatchedList = () => {
  const { watchedMovies, setWatchedMovies } = useMoviesContext();

  useEffect(() => {
    const storageMovies = localStorage.getItem("movies")!;
    if (Array.isArray(JSON.parse(storageMovies))) {
      setWatchedMovies(JSON.parse(storageMovies));
    } else {
      localStorage.setItem("movies", JSON.stringify([]));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg bg-primary-3  ">
      <div
        className={`flex w-full flex-col rounded-b-lg bg-primary-3  px-2 pt-2 ${
          watchedMovies.length === 0 && "pb-2"
        }`}
      >
        {watchedMovies.length === 0 ? (
          <p className="flex items-center gap-1 text-lg">
            Comece adicionando um filme a lista.
          </p>
        ) : (
          <p className="flex items-center gap-1 text-lg">
            Você possui <strong> {watchedMovies.length} </strong> filme
            {watchedMovies.length > 1 && "s"} assistido
            {watchedMovies.length > 1 && "s"}.
          </p>
        )}
      </div>
      {watchedMovies.length > 0 && (
        <ul className="flex w-full flex-col gap-2 ">
          {watchedMovies.map((movie: WatchedMoviesTypes) => {
            return (
              <MovieItem
                watched={true}
                movieId={movie.id}
                key={movie.id}
                movie={movie}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MoviesWatchedList;
