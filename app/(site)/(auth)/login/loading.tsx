import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="hidden bg-foreground lg:block" />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <Skeleton className="mx-auto h-8 w-48 lg:mx-0" />
            <Skeleton className="mx-auto h-5 w-64 lg:mx-0" />
          </div>

          <div className="space-y-5">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
