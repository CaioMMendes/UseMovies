import timeConversor from "@/utils/time-conversor";
import Button from "./button";
import { MovieDetailsDataTypes } from "./movie-details";
import {
  WatchedMoviesTypes,
  useMoviesContext,
} from "../contexts/movies-context";
import Badge from "./badge";
import dateConveror from "@/utils/date-conversor";
import UserStars from "./user-stars";
import { useState } from "react";

interface MovieDetailsDescriptionProps {
  data: MovieDetailsDataTypes;
  id?: number;
}

const MovieDetailsDescription = ({
  data,
  id,
}: MovieDetailsDescriptionProps) => {
  const { watchedMovies, setWatchedMovies } = useMoviesContext();
  const [stars, setStars] = useState<number>(0);
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
          user_average: stars || "Sem avaliação",
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
            user_average: stars || "Sem avaliação",
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
      <ul className="flex    flex-col justify-center">
        <p className="flex">
          Data de lançamento:{" "}
          <Badge value={dateConveror(data.release_date)} type={"calendary"} />
        </p>
        <p className="flex">
          Duração:{" "}
          <Badge
            value={`${timeConversor({ time: data?.runtime })}`}
            type={"time"}
          />
        </p>
        <p className="flex">
          Avaliação:{" "}
          <Badge value={data.vote_average.toFixed(2)} type={"star"} />
        </p>
      </ul>
      <div className="flex w-full flex-col gap-1 rounded-lg bg-primary-3-opacity pt-2">
        <UserStars stars={stars} setStars={setStars} />
        <Button variant="button" onClick={handleAddMovieClick}>
          Adicionar a lista
        </Button>
      </div>
    </>
  );
};

export default MovieDetailsDescription;
