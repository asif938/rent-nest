"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="max-w-lg text-center">

        <h1 className="font-display text-7xl font-medium text-destructive">
          Oops!
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Something went wrong
        </h2>

        <p className="mt-4 text-muted-foreground">
          We could not load the property listings. Please try again in a
          moment.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <Button
            className="rounded-full"
            onClick={reset}
          >
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full"
            >
              Back Home
            </Button>
          </Link>

        </div>

      </div>
    </div>
  );
}
