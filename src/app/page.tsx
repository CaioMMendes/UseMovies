"use client";
import { useState } from "react";
import MoviesList from "./components/movies-list";
import MoviesWatched from "./components/movies-watched";
import { useMoviesContext } from "./contexts/movies-context";
import MovieDetails from "./components/movie-details";

export interface MovieOpenTypes {
  isOpen: boolean;
  id?: number;
}

export default function Home() {
  const { movies, isMovieInfoOpen } = useMoviesContext();

  return (
    <div className="flex  w-full flex-col gap-4 p-2 md:grid md:grid-cols-2 ">
      <MoviesWatched />
      {isMovieInfoOpen.isOpen ? (
        <MovieDetails movieId={isMovieInfoOpen.id} />
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
}
