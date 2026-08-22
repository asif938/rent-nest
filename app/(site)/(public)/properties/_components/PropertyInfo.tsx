import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyInfo({
  property,
}: Props) {
  return (
    <section>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full">
          {property.category.name}
        </Badge>

        <Badge
          variant={property.isAvailable ? "outline" : "destructive"}
          className="rounded-full"
        >
          {property.isAvailable ? "Available" : "Not Available"}
        </Badge>
      </div>

      <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
        {property.title}
      </h1>

      <p className="mt-3 flex items-center gap-1.5 text-muted-foreground">
        <MapPin size={16} />
        {property.location}
      </p>

      <p className="mt-6 font-display text-3xl font-medium text-primary">
        ${property.price}
        <span className="text-lg font-normal text-muted-foreground">
          /month
        </span>
      </p>

    </section>
  );
}
