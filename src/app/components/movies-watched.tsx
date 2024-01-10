"use client";
import { useState } from "react";
import MoviesList from "./movies-list";
import { MinusIcon, PlusIcon } from "lucide-react";
import Button from "./button";
import { MovieOpenTypes } from "../page";
import MoviesWatchedList from "./movies-watched-list";

interface MoviesWatchedProps {
  setIsMovieInfoOpen: React.Dispatch<React.SetStateAction<MovieOpenTypes>>;
}

const MoviesWatched = ({ setIsMovieInfoOpen }: MoviesWatchedProps) => {
  const [isOpenList, setIsOpenList] = useState(true);

  const handleIsOpenList = () => {
    setIsOpenList((isOpenList) => !isOpenList);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className={`flex flex-col items-center justify-start`}>
        <div
          className={`${
            isOpenList && "rounded-b-none"
          } flex w-full items-center  justify-between rounded-lg bg-primary-3/70 px-2 py-2`}
        >
          <h2 className="w-full items-center justify-start font-medium uppercase">
            Filmes que você já assistiu
          </h2>
          <Button
            onClick={handleIsOpenList}
            variant="button"
            className="w-fit rounded-full p-1"
          >
            {isOpenList ? (
              <MinusIcon width={24} height={24} />
            ) : (
              <PlusIcon width={24} height={24} />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between"></div>
      </div>
      {isOpenList && (
        <MoviesWatchedList setIsMovieInfoOpen={setIsMovieInfoOpen} />
      )}
    </div>
  );
};

export default MoviesWatched;
