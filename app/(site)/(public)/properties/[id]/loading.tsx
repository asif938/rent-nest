import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container py-10">

      {/* Property Image */}
      <Skeleton className="h-112.5 w-full rounded-xl" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">

        {/* Left Side */}
        <div className="space-y-10">

          {/* Property Info */}
          <section className="space-y-4">
            <Skeleton className="h-10 w-2/3" />

            <div className="flex gap-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>

            <Skeleton className="h-8 w-40" />
          </section>

          {/* Amenities */}
          <section className="space-y-4">
            <Skeleton className="h-8 w-40" />

            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-10 w-24 rounded-full"
                />
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="space-y-3">
            <Skeleton className="h-8 w-44" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </section>

          {/* Reviews */}
          <section className="space-y-5">
            <Skeleton className="h-8 w-36" />

            <div className="space-y-4">
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          {/* Landlord Card */}
          <Skeleton className="h-44 w-full rounded-xl" />

          {/* Request Button */}
          <Skeleton className="h-12 w-full rounded-lg" />

        </aside>

      </div>

    </main>
  );
}