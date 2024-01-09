import timeConversor from "@/utils/time-conversor";
import Button from "./button";
import { MovieDetailsDataTypes } from "./movie-details";
import {
  WatchedMoviesTypes,
  useMoviesContext,
} from "../contexts/movies-context";

interface MovieDetailsDescriptionProps {
  data: MovieDetailsDataTypes;
  id?: number;
}

const MovieDetailsDescription = ({
  data,
  id,
}: MovieDetailsDescriptionProps) => {
  const { movies, watchedMovies, setWatchedMovies } = useMoviesContext();
  const exactMovie = movies.filter((movie) => movie.id === id);

  const handleAddMovieClick = () => {
    const alreadyAdd = watchedMovies.filter((movie) => movie.id === id);
    if (alreadyAdd.length === 0) {
      setWatchedMovies((watchedMovies) => [
        {
          id: data.id,
          poster_path: data.poster_path,
          title: data.title,
          vote_average: data.vote_average,
          release_date: data.release_date,
          runtime: data.runtime,
        },
        ...watchedMovies,
      ]);
      localStorage.setItem(
        "movies",
        JSON.stringify([
          {
            id: data.id,
            poster_path: data.poster_path,
            title: data.title,
            vote_average: data.vote_average,
            release_date: data.release_date,
            runtime: data.runtime,
          },
          ...watchedMovies,
        ]),
      );
    }
  };
  return (
    <>
      <h1 className="text-lg font-semibold">{data?.title}</h1>
      <p>{data?.overview}</p>
      <p>Duração: {timeConversor({ time: data?.runtime })}.</p>
      <p>Avaliação: {data?.vote_average.toFixed(2)}</p>
      <Button variant="button" onClick={handleAddMovieClick}>
        Adicionar a lista
      </Button>
    </>
  );
};

export default MovieDetailsDescription;
