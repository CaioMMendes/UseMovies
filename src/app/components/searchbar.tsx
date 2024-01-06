"use client";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Input from "./Input";
import { useDebounce } from "../helpers/use-debounce";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");

  const debounceSearch = useDebounce(searchInput);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    console.log(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  return (
    <div className="flex w-full items-center">
      <Input
        placeholder="Busque por um filme ..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default Searchbar;
