import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container py-10">

      <div className="mb-10 space-y-3">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

        <div className="hidden h-fit space-y-5 rounded-2xl border border-border/70 bg-card p-6 lg:block">
          <Skeleton className="h-6 w-24" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-3"
            >
              <Skeleton className="h-56 w-full rounded-2xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>

      </div>

    </main>
  );
}
