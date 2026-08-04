import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyCard({
  property,
}: Props) {
  return (
    <div className="rounded-xl border p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Property Information
      </h2>

      <div className="space-y-3">

        <div>
          <p className="text-sm text-muted-foreground">
            Title
          </p>

          <p className="font-medium">
            {property.title}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Location
          </p>

          <p>{property.location}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Category
          </p>

          <Badge>
            {property.category.name}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Monthly Rent
          </p>

          <p className="font-semibold">
            ৳{property.price.toLocaleString()}
          </p>
        </div>

        <div>

          <p className="mb-2 text-sm text-muted-foreground">
            Amenities
          </p>

          <div className="flex flex-wrap gap-2">

            {property.amenities.map(
              (item: string) => (
                <Badge
                  key={item}
                  variant="secondary"
                >
                  {item}
                </Badge>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}