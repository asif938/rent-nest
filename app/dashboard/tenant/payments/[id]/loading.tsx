import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentDetailsLoading() {
  return (
    <div className="space-y-8">

      <div className="space-y-3">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-2xl border border-border/70 bg-card p-6"
          >
            <Skeleton className="h-5 w-32" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-9 w-40 rounded-full" />

    </div>
  );
}
