import Image from "next/image";
import { Movie } from "../contexts/movies-context";
import ImageWithFallback from "./image-with-fallback";

const MovieItem = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex w-full items-center justify-start gap-3">
      <div className="flex w-2/5">
        <ImageWithFallback
          //   src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={`${movie.title} banner`}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[75%] w-auto max-w-[90%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="flex w-3/5 flex-col gap-2">
        <h3>{movie.title}</h3>
        <div className="flex gap-3">{movie.vote_average.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default MovieItem;
