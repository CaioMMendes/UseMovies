import { Movie } from "../contexts/movies-context";
import { MovieOpenTypes } from "../page";
import MovieItem from "./movie-item";

interface MoiviesWatchedListProps {
  movies: Movie[];
  setIsMovieInfoOpen: React.Dispatch<React.SetStateAction<MovieOpenTypes>>;
}

const MoviesWatchedList = ({
  movies,
  setIsMovieInfoOpen,
}: MoiviesWatchedListProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg bg-primary-3  ">
      <div className={`flex w-full flex-col rounded-b-lg bg-primary-3  p-2`}>
        <p className="flex items-center gap-1 text-lg">
          Você possuí <strong> X </strong> filmes assistidos.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 p-2">
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
      </div>
    </div>
  );
};

export default MoviesWatchedList;
