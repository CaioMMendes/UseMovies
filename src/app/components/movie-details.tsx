import { ArrowLeftIcon, MoveLeftIcon } from "lucide-react";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";
import { MovieOpenTypes } from "../page";
import { useQuery } from "react-query";
import getMovieDetails from "../fetch/get-movie-details";
import ListError from "./list-error";
import ListLoading from "./list-Loading";
import ImageWithFallback from "./image-with-fallback";
import getMovieCasts, { CasterTypes } from "../fetch/get-movie-casts";
import CastersItem from "./casters-item";

interface MovieDetailsProps {
  setIsMovieInfoOpen: Dispatch<SetStateAction<MovieOpenTypes>>;
  movieId?: number;
}

const MovieDetails = ({ setIsMovieInfoOpen, movieId }: MovieDetailsProps) => {
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

  if (movieDetailsIsError || movieCastsIsError) {
    return <ListError rounded={true} />;
  }
  if (movieDetailsIsLoading) {
    return <ListLoading rounded={true} />;
  }
  console.log(movieDetailsData);
  return (
    <div className="flex flex-col items-start justify-start gap-2 rounded-lg bg-primary-3">
      <div className="relative flex   w-full items-center justify-start rounded-lg">
        <ImageWithFallback
          src={`https://image.tmdb.org/t/p/w1280${movieDetailsData?.movies.backdrop_path}`}
          alt={`${movieDetailsData?.movies.title} banner`}
          width={0}
          height={0}
          fallback="/image-not-found-backdrop.png"
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
      <h1 className="text-lg font-medium">{movieDetailsData?.movies.title}</h1>
      <p>descrição {movieDetailsData?.movies.overview}</p>
      <p>tempo {movieDetailsData?.movies.runtime.toFixed(2)}</p>
      <p>pontuação {movieDetailsData?.movies.vote_average}</p>
      <div>
        <h3>Elenco</h3>
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
