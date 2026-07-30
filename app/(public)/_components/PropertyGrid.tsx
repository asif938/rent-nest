
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
      <div className="flex h-72 items-center justify-center rounded-lg border">
        <p>No properties found.</p>
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