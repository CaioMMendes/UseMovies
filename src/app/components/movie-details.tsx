import { MoveLeftIcon } from "lucide-react";
import Button from "./button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MovieOpenTypes } from "../page";
import { useQuery } from "react-query";
import getMovieDetails from "../fetch/get-movie-details";
import ListError from "./list-error";
import ListLoading from "./list-Loading";
import ImageWithFallback from "./image-with-fallback";
import getMovieCasts, { CasterTypes } from "../fetch/get-movie-casts";
import CastersItem from "./casters-item";
import timeConversor from "@/utils/time-conversor";
import MovieDetailsDescription from "./movie-details-description";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { useMoviesContext } from "../contexts/movies-context";

interface MovieDetailsProps {
  movieId?: number;
}

export interface MovieDetailsDataTypes {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { setIsMovieInfoOpen } = useMoviesContext();
  const {
    data: movieDetailsData,
    isError: movieDetailsIsError,
    isLoading: movieDetailsIsLoading,
  } = useQuery({
    queryKey: ["details", movieId],
    queryFn: async () => await getMovieDetails({ id: movieId }),
  });
  const {
    data: movieCastsData,
    isError: movieCastsIsError,
    isLoading: movieCastsIsLoading,
  } = useQuery({
    queryKey: ["casts", movieId],
    queryFn: async () => await getMovieCasts({ id: movieId }),
  });
  const handleBackButtonClick = () => {
    setIsMovieInfoOpen({ isOpen: false });
  };

  useEffect(() => {
    document.title = movieDetailsData?.movies?.title;
    return () => {
      document.title = "Use Movie";
    };
  }, [movieDetailsData]);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        handleBackButtonClick();
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (movieDetailsIsError || movieCastsIsError) {
    return <ListError rounded={true} />;
  }
  if (movieDetailsIsLoading) {
    return <ListLoading rounded={true} />;
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg bg-primary-3 ">
      <div className="relative flex w-full  items-start justify-center rounded-lg md:min-h-80">
        <ImageWithFallback
          src={`https://image.tmdb.org/t/p/w1280${movieDetailsData?.movies.backdrop_path}`}
          alt={`${movieDetailsData?.movies.title} banner`}
          width={0}
          height={0}
          fallback={"/image-not-found-backdrop.png"}
          sizes="100vw"
          className="h-auto  w-full  rounded-lg"
          style={{
            objectFit: "contain",
          }}
        />
        <Button
          variant="button"
          className="absolute left-2 top-2 w-fit rounded-full p-1"
          onClick={handleBackButtonClick}
        >
          <MoveLeftIcon width={24} height={24} />
        </Button>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <MovieDetailsDescription data={movieDetailsData?.movies} id={movieId} />
        <h3>Elenco:</h3>
        {movieCastsIsLoading && <div>Loading...</div>}
        {!movieCastsIsLoading && movieCastsData?.casts !== undefined && (
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {movieCastsData.casts.map((caster: CasterTypes, index: number) => {
              return (
                index < 10 && <CastersItem key={caster.id} caster={caster} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
