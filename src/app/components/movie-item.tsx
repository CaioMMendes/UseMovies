import dateConveror from "@/utils/date-conversor";
import timeConversor from "@/utils/time-conversor";
import { XIcon } from "lucide-react";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import {
  Movie,
  WatchedMoviesTypes,
  useMoviesContext,
} from "../contexts/movies-context";
import { MovieOpenTypes } from "../page";
import Badge from "./badge";
import Button from "./button";
import ImageWithFallback from "./image-with-fallback";

interface MovieItemProps {
  movie: Movie | WatchedMoviesTypes;
  setIsMovieInfoOpen: Dispatch<SetStateAction<MovieOpenTypes>>;
  movieId: number;
  watched?: boolean;
}

const MovieItem = ({
  movie,
  setIsMovieInfoOpen,
  movieId,
  watched = false,
}: MovieItemProps) => {
  const { watchedMovies, setWatchedMovies } = useMoviesContext();
  const handleMovieItemClick = () => {
    setIsMovieInfoOpen({ isOpen: true, id: movieId });
  };
  const handleRemoveWatchedMovie = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const currentWatchedMovies = watchedMovies.filter(
      (movieFilter) => movieFilter.id !== movieId,
    );
    setWatchedMovies(currentWatchedMovies);
    const storageMovies = localStorage.getItem("movies")!;
    if (Array.isArray(JSON.parse(storageMovies))) {
      localStorage.setItem("movies", JSON.stringify(currentWatchedMovies));
    } else {
      localStorage.setItem("movies", JSON.stringify([]));
    }
  };
  return (
    <li className="flex h-full w-full list-none">
      <Button
        type="button"
        className="z-0 flex w-full items-center justify-start gap-3 rounded-lg  bg-primary-3-opacity  "
        onClick={handleMovieItemClick}
      >
        <div className="flex h-36 w-24 items-center justify-start rounded-l-lg md:h-[186px] md:w-32">
          <ImageWithFallback
            //   src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} banner`}
            width={0}
            height={0}
            fallback="/image-not-found-poster.png"
            sizes="100vw"
            className="h-auto  w-full  rounded-l-lg"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="flex h-full w-4/6 flex-col items-start justify-between gap-2 overflow-hidden py-2 pr-2 md:w-4/5">
          <h3 className="w-full flex-nowrap truncate text-start  text-lg font-semibold ">
            {movie.title}
          </h3>
          <div className="flex w-full flex-1 items-center justify-between">
            <ul className="flex  flex-1  flex-col justify-center">
              <Badge
                className="flex"
                value={dateConveror(movie.release_date)}
                type={"calendary"}
              />
              {"runtime" in movie && (
                <Badge
                  className="flex"
                  value={`${timeConversor({ time: movie.runtime })}`}
                  type={"time"}
                />
              )}
              <Badge
                className="flex"
                value={movie.vote_average.toFixed(2)}
                type={"star"}
              />
            </ul>
            {watched && (
              <Button
                onClick={handleRemoveWatchedMovie}
                title="Remover filme"
                type="button"
                variant="button"
                className="z-10 h-fit w-fit rounded-full p-1"
              >
                <XIcon width={24} height={24} />
              </Button>
            )}
          </div>
        </div>
      </Button>
    </li>
  );
};

export default MovieItem;
