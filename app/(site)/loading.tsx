import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="space-y-4">

      {/* Hero placeholder */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <Skeleton className="h-7 w-48 rounded-full" />
        <Skeleton className="h-14 w-full max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-xl" />

        <div className="flex gap-4">
          <Skeleton className="h-12 w-44 rounded-full" />
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
      </div>

      {/* Category grid placeholder */}
      <div className="container py-20">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-4 w-24" />
          <Skeleton className="mx-auto mt-3 h-9 w-64" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-44 rounded-2xl"
            />
          ))}
        </div>
      </div>

      {/* Property grid placeholder */}
      <div className="container py-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-9 w-56" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
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

    </div>
  );
}
