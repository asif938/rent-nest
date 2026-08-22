import { SearchX } from "lucide-react";

import { getProperties } from "@/lib/property";
import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";

type Props = {
  searchParams: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    available?: string;
    page?: string;
  };
};

export default async function PropertyGrid({
  searchParams,
}: Props) {
  const properties = await getProperties(searchParams);

  if (!properties.length) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 text-center">
        <SearchX
          size={32}
          className="text-muted-foreground/50"
        />

        <div>
          <p className="font-medium">No properties found</p>

          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property: Property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}