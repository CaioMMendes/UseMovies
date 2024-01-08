import { ArrowLeftIcon, MoveLeftIcon } from "lucide-react";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";
import { MovieOpenTypes } from "../page";
import { useQuery } from "react-query";
import getMovieDetails from "../fetch/get-movie-details";
import ListError from "./list-error";
import ListLoading from "./list-Loading";
import ImageWithFallback from "./image-with-fallback";

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
    queryKey: [movieId],
    queryFn: async () => await getMovieDetails({ id: movieId }),
  });

  const handleBackButtonClick = () => {
    setIsMovieInfoOpen({ isOpen: false });
  };

  if (movieDetailsIsError) {
    return <ListError rounded={true} />;
  }
  if (movieDetailsIsLoading) {
    return <ListLoading rounded={true} />;
  }
  console.log(movieDetailsData);
  return (
    <div className="flex flex-col items-start justify-start gap-2 rounded-lg bg-primary-3">
      <Button
        variant="button"
        className="w-fit rounded-full p-1"
        onClick={handleBackButtonClick}
      >
        <MoveLeftIcon width={24} height={24} />
      </Button>
      <h1 className="text-lg font-medium">{movieDetailsData?.movies.title}</h1>
      <ImageWithFallback
        src={`https://image.tmdb.org/t/p/w500${movieDetailsData?.movies.backdrop_path}`}
        alt="Movie poster image"
        width={200}
        fallback="/image-not-found-poster.png"
        height={200}
      />
      <p>descrição {movieDetailsData?.movies.overview}</p>
      <p>tempo {movieDetailsData?.movies.runtime.toFixed(2)}</p>
      <p>pontuação {movieDetailsData?.movies.vote_average}</p>
      asdas
    </div>
  );
};

export default MovieDetails;
