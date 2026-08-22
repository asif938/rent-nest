import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">

      <div className="space-y-3">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/70 bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-14" />
              </div>

              <Skeleton className="h-11 w-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70">
        <div className="border-b border-border/70 p-6">
          <Skeleton className="h-6 w-44" />
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-border/70 px-6 py-4 last:border-none"
          >
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>

    </div>
  );
}
