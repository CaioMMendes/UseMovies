import ImageWithFallback from "./image-with-fallback";

interface CastersItemProps {
  caster: {
    name: string;
    character: string;
    profile_path: string;
  };
}

const CastersItem = ({ caster }: CastersItemProps) => {
  return (
    <div className="flex w-28 flex-col overflow-hidden">
      <div className="flex w-28  max-w-52 items-center justify-center rounded-lg md:w-full">
        <ImageWithFallback
          //   src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          src={`https://image.tmdb.org/t/p/w500${caster.profile_path}`}
          alt={`${caster.name} image`}
          width={0}
          height={0}
          fallback="/image-not-found-poster.png"
          sizes="100vw"
          className="h-auto  w-auto  rounded-lg"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <p className="flex-nowrap truncate ">{caster.name}</p>
      <p className="flex-nowrap truncate ">{caster.character}</p>
    </div>
  );
};

export default CastersItem;
