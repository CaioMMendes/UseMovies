import Image from "next/image";
import { Movie } from "../contexts/movies-context";
import ImageWithFallback from "./image-with-fallback";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";
import { MovieOpenTypes } from "../page";

interface MovieItemProps {
  movie: Movie;
  setIsMovieInfoOpen: Dispatch<SetStateAction<MovieOpenTypes>>;
  movieId: number;
}

const MovieItem = ({ movie, setIsMovieInfoOpen, movieId }: MovieItemProps) => {
  const handleMovieItemClick = () => {
    setIsMovieInfoOpen({ isOpen: true, id: movieId });
  };

  return (
    <Button
      className="bg-primary-3-opacity flex w-full items-center justify-start gap-3  rounded-lg  "
      onClick={handleMovieItemClick}
    >
      <div className="flex w-2/5  max-w-52 items-center justify-start rounded-l-lg">
        <ImageWithFallback
          //   src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} banner`}
          width={0}
          height={0}
          fallback="/image-not-found-backdrop.png"
          sizes="100vw"
          className="h-auto  w-auto  rounded-l-lg"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="flex w-3/5 flex-col justify-start gap-2 overflow-hidden">
        <h3 className="flex w-full flex-nowrap items-center justify-start truncate text-sm">
          {movie.title}
        </h3>
        <div className="flex gap-3">{movie.vote_average.toFixed(2)}</div>
      </div>
    </Button>
  );
};

export default MovieItem;
