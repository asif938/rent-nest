"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold">
        Something went wrong.
      </h2>

      <button
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
}