"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function RentalsError({
  error,
  reset,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">

        <h2 className="text-2xl font-semibold">
          Unable to load your rentals
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading your rental requests.
          Please try again.
        </p>

        <Button
          className="mt-6 rounded-full"
          onClick={() => reset()}
        >
          Try Again
        </Button>

      </div>
    </div>
  );
}
