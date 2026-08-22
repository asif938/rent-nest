import Link from "next/link";

import { Button } from "@/components/ui/button";


import { getFeaturedProperties } from "@/lib/getFeaturedProperties";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property";

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  return (
    <section className="py-20">
      <div className="container">

        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium tracking-wide text-primary uppercase">
              Listings
            </span>

            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
              Featured Properties
            </h2>

            <p className="mt-3 text-muted-foreground">
              Browse our latest rental listings.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden sm:block"
          >
            <Button
              variant="outline"
              className="rounded-full"
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property: Property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

      </div>
    </section>
  );
}