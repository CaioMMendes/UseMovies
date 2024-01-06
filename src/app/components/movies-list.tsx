interface MovieListProps {
  rounded?: boolean;
}

const MoviesList = ({ rounded = true }: MovieListProps) => {
  return (
    <div
      className={`${
        rounded && "rounded-lg"
      } flex w-full flex-col rounded-b-lg bg-primary-3 p-2`}
    >
      {rounded ? (
        <p className="flex items-center gap-1 text-lg">
          Foram encontrados <strong> X </strong> filmes.
        </p>
      ) : (
        <p className="flex items-center gap-1 text-lg">
          Você possuí <strong> X </strong> filmes assistidos.
        </p>
      )}
    </div>
  );
};

export default MoviesList;
