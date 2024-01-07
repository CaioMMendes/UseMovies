import { Movie, useMoviesContext } from "../contexts/movies-context";
import MovieItem from "./movie-item";

interface MovieListProps {
  rounded?: boolean;
  movies: Movie[];
}

const MoviesList = ({ rounded = true, movies }: MovieListProps) => {
  const { isError, isLoading, search, moviesInfo } = useMoviesContext();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-start gap-2">
        <div
          className={`${
            rounded && "rounded-lg"
          } flex w-full flex-col rounded-b-lg bg-primary-3 p-2`}
        >
          <div className="flex items-center justify-center">
            <p>Ocorreu um erro, tente novamente em alguns instantes.</p>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-start gap-2">
        <div
          className={`${
            rounded && "rounded-lg"
          } flex w-full flex-col rounded-b-lg bg-primary-3 p-2`}
        >
          <div className="flex items-center justify-start">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <div
        className={`${
          rounded && "rounded-lg"
        } flex w-full flex-col rounded-b-lg bg-primary-3 p-2`}
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

      {movies.map((movie) => {
        return <MovieItem key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default MoviesList;
