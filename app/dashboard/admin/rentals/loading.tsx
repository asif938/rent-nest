import { Skeleton } from "@/components/ui/skeleton";

export default function RentalsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-5 w-72" />
      </div>

      <Skeleton className="h-9 w-full max-w-sm" />

      <div className="overflow-hidden rounded-2xl border border-border/70">
        <div className="grid grid-cols-5 gap-4 bg-muted/40 px-6 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-16"
            />
          ))}
        </div>

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-t border-border/70 px-6 py-4"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
