import Link from "next/link";
import { House, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">

      <Link
        href="/"
        className="mb-8 flex items-center gap-2.5"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <House size={18} />
        </span>

        <span className="font-display text-xl font-semibold">
          RentNest
        </span>
      </Link>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
        <SearchX size={28} />
      </div>

      <h1 className="mt-6 font-display text-7xl font-medium">
        404
      </h1>

      <h2 className="mt-2 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have
        been moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button className="rounded-full">
            Back Home
          </Button>
        </Link>

        <Link href="/properties">
          <Button
            variant="outline"
            className="rounded-full"
          >
            Browse Properties
          </Button>
        </Link>
      </div>

    </div>
  );
}
