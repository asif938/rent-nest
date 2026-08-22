import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesLoading() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-52" />
          <Skeleton className="h-5 w-64" />
        </div>

        <Skeleton className="h-9 w-36 rounded-full" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border/70"
          >
            <Skeleton className="h-44 w-full rounded-none" />

            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
