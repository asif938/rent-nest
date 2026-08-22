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
        <div className="container flex min-h-[70vh] items-center justify-center">
            <div className="max-w-lg text-center">

                <h1 className="text-7xl font-bold text-destructive">
                    Oops!
                </h1>

                <h2 className="mt-4 text-3xl font-semibold">
                    Something went wrong
                </h2>

                <p className="mt-4 text-muted-foreground">
                    We could not load this property. It may have been removed,
                    or there was a temporary server error.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    <Button onClick={reset}>
                        Try Again
                    </Button>

                    <Link href="/properties">
                        <Button variant="outline">
                            Back to Properties
                        </Button>
                    </Link>

                </div>

            </div>
        </div>
    );
}