import { Movie, useMoviesContext } from "../contexts/movies-context";
import { MovieOpenTypes } from "../page";
import ListLoading from "./list-Loading";
import ListError from "./list-error";
import MovieItem from "./movie-item";

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
  const { isError, isLoading, search, moviesInfo } = useMoviesContext();

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
    </div>
  );
};

export default MoviesList;
