"use client";
import MoviesList from "./components/movies-list";
import MoviesWatched from "./components/movies-watched";
import { useMoviesContext } from "./contexts/movies-context";

export default function Home() {
  const { movies } = useMoviesContext();
  console.log(movies);
  return (
    <div className="flex  w-full flex-col gap-4 p-2 md:grid md:grid-cols-2 ">
      <MoviesWatched />
      <MoviesList movies={movies} />
    </div>
  );
}
