"use client";
import { Dispatch, SetStateAction, useState } from "react";

import { v4 as uuidv4 } from "uuid";

interface UserStarsProps {
  stars: number;
  setStars: Dispatch<SetStateAction<number>>;
}
const UserStars = ({ stars = 0, setStars }: UserStarsProps) => {
  const handleStarClick = (stars: number) => {
    setStars(stars);
  };
  return (
    <div className="flex w-full gap-1">
      <p className="pl-2">Sua avaliação: </p>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <button
            key={uuidv4()}
            onClick={() => handleStarClick(index + 1)}
            className={`${
              index > stars - 1 && "fgrayscale opacity-30 grayscale "
            }`}
          >
            ⭐
          </button>
        );
      })}
      {!stars || ` ${stars}/10`}
    </div>
  );
};

export default UserStars;
