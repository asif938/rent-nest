import { Skeleton } from "@/components/ui/skeleton";

export default function RentalsLoading() {
  return (
    <div className="space-y-8">

      <div className="space-y-3">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-72" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70">
        <div className="grid grid-cols-6 gap-4 bg-muted/40 px-6 py-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-16"
            />
          ))}
        </div>

        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center gap-4 border-t border-border/70 px-6 py-5"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>

            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="ml-auto h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>

    </div>
  );
}
