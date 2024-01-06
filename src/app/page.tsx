import MoviesList from "./components/movies-list";
import MoviesWatched from "./components/movies-watched";

export default function Home() {
  return (
    <div className="flex  p-2 flex-col md:grid md:grid-cols-2 gap-4 w-full ">
      <MoviesWatched />
      <MoviesList />
    </div>
  );
}
