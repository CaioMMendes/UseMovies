const ListLoading = ({ rounded }: { rounded?: boolean }) => {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-2">
      <div
        className={`${
          rounded && "rounded-lg"
        } flex h-full w-full flex-col rounded-b-lg bg-primary-3 p-2`}
      >
        <div className="flex items-center justify-start">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default ListLoading;
