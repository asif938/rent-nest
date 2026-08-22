import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentSuccessLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Skeleton className="mx-auto mb-8 h-9 w-40" />

        <div className="rounded-2xl border border-border/70 bg-card p-8 text-center">
          <Skeleton className="mx-auto h-16 w-16 rounded-full" />
          <Skeleton className="mx-auto mt-6 h-7 w-48" />
          <Skeleton className="mx-auto mt-2 h-4 w-64" />
          <Skeleton className="mx-auto mt-2 h-4 w-56" />

          <div className="mt-8 flex justify-center gap-3">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
