import Image from "next/image";
import Input from "./Input";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row bg-primary-5 rounded-b-lg shadow-md p-2 items-center justify-between gap-2 md:gap-6">
      <div className="flex gap-1 px-2 justify-center items-end md:w-fit w-full">
        {/* <span className="text-[1.5rem]">🍿</span> */}
        <Image src={"/popcorn.png"} width={30} height={30} alt="Logo image" />
        <h1 className="font-semibold text-lg flex items-end leading-none ">
          UseMovies
        </h1>
      </div>
      <Input placeholder="Search movies ..." />
      {/* searchbar */}
    </header>
  );
};

export default Header;
