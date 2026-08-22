import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export default function Pagination({
  page,
  totalPages,
  buildHref,
}: Props) {
  if (totalPages <= 1) return null;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex items-center justify-between border-t border-border/70 px-6 py-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        {canGoPrev ? (
          <Link
            href={buildHref(page - 1)}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full"
            )}
          >
            <ChevronLeft size={14} />
            Prev
          </Link>
        ) : (
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full opacity-50"
            )}
          >
            <ChevronLeft size={14} />
            Prev
          </span>
        )}

        {canGoNext ? (
          <Link
            href={buildHref(page + 1)}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full"
            )}
          >
            Next
            <ChevronRight size={14} />
          </Link>
        ) : (
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full opacity-50"
            )}
          >
            Next
            <ChevronRight size={14} />
          </span>
        )}
      </div>
    </div>
  );
}
