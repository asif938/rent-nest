import { Skeleton } from "@/components/ui/skeleton";

export default function EditPropertyLoading() {
  return (
    <div className="max-w-3xl space-y-8">

      <div className="space-y-3">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-64" />
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="space-y-4 rounded-2xl border border-border/70 bg-card p-6"
        >
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ))}

    </div>
  );
}
