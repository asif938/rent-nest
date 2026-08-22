import { Badge } from "@/components/ui/badge";
import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import { Rental } from "@/types/rental";

type Props = {
  property: Rental["property"];
};

export default function PropertyCard({
  property,
}: Props) {
  return (
    <DetailCard title="Property Information">

      <DetailRow label="Title">
        <p className="font-medium">
          {property.title}
        </p>
      </DetailRow>

      <DetailRow label="Location">
        <p>{property.location}</p>
      </DetailRow>

      <DetailRow label="Category">
        <Badge className="rounded-full">
          {property.category.name}
        </Badge>
      </DetailRow>

      <DetailRow label="Monthly Rent">
        <p className="font-semibold text-primary">
          ৳{property.price.toLocaleString()}
        </p>
      </DetailRow>

      <DetailRow label="Amenities">
        <div className="flex flex-wrap gap-2">
          {property.amenities.map((item: string) => (
            <Badge
              key={item}
              variant="secondary"
              className="rounded-full"
            >
              {item}
            </Badge>
          ))}
        </div>
      </DetailRow>

    </DetailCard>
  );
}
