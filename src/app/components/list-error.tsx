const ListError = ({ rounded }: { rounded?: boolean }) => {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-2">
      <div
        className={`${
          rounded && "h-full rounded-lg"
        } flex  w-full flex-col rounded-b-lg bg-primary-3 p-2`}
      >
        <div className="flex items-center justify-center">
          <p>Ocorreu um erro, tente novamente em alguns instantes.</p>
        </div>
      </div>
    </div>
  );
};

export default ListError;
