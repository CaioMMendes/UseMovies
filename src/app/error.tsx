"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Button from "./components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-2">
      <h2 className="text-lg ">Something went wrong!</h2>
      <Button
        variant="button"
        className="max-w-96"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
