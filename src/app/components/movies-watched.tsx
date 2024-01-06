"use client";
import { useState } from "react";
import MoviesList from "./movies-list";
import { MinusIcon, PlusIcon } from "lucide-react";

const MoviesWatched = () => {
  const [isOpenList, setIsOpenList] = useState(true);

  const handleIsOpenList = () => {
    setIsOpenList((isOpenList) => !isOpenList);
  };

  return (
    <div className="flex flex-col ">
      <div className={`flex flex-col items-center justify-start`}>
        <div
          className={`${
            isOpenList && "rounded-b-none"
          } flex justify-between w-full  items-center rounded-lg px-2 py-2 bg-primary-3/70`}
        >
          <h2 className="w-full justify-start items-center uppercase font-medium">
            Filmes que você já assistiu
          </h2>
          <button
            onClick={handleIsOpenList}
            className="rounded-full flex items-center  justify-center bg-primary-5 p-1"
          >
            {isOpenList ? (
              <MinusIcon width={24} height={24} />
            ) : (
              <PlusIcon width={24} height={24} />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center"></div>
      </div>
      {isOpenList && <MoviesList rounded={false} />}
    </div>
  );
};

export default MoviesWatched;
