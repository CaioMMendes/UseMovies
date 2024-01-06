import Image from "next/image";
import Searchbar from "./searchbar";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-between gap-2 rounded-b-lg bg-primary-5 p-2 shadow-md md:flex-row md:gap-6">
      <div className="flex w-full items-end justify-center gap-1 px-2 md:w-fit">
        <Image src={"/logo.png"} width={30} height={30} alt="Logo image" />
        <h1 className="flex items-end text-lg font-semibold leading-none ">
          UseMovies
        </h1>
      </div>
      <Searchbar />
    </header>
  );
};

export default Header;
