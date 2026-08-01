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

      <h1 className="text-4xl font-bold">
        {property.title}
      </h1>

      <div className="mt-5 flex flex-wrap gap-3">

        <Badge>
          {property.category.name}
        </Badge>

        <Badge variant="secondary">
          {property.location}
        </Badge>

      </div>

      <h2 className="mt-6 text-3xl font-bold text-primary">
        ${property.price}/month
      </h2>

    </section>
  );
}