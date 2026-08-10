"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function PaymentsError({
  error,
  reset,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8 text-center">

        <h2 className="text-2xl font-semibold">
          Unable to load payments
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading your payment
          history. Please try again.
        </p>

        <Button
          className="mt-6"
          onClick={() => reset()}
        >
          Try Again
        </Button>

      </div>
    </div>
  );
}