import Link from "next/link";

import { Button } from "@/components/ui/button";


import { getFeaturedProperties } from "@/lib/getFeaturedProperties";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property";

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">

        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold">
              Featured Properties
            </h2>

            <p className="mt-2 text-muted-foreground">
              Browse our latest rental listings.
            </p>
          </div>

          <Link href="/properties">
            <Button variant="outline">
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