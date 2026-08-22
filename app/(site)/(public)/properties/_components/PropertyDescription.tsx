import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyDescription({
  property,
}: Props) {
  return (
    <section>

      <h2 className="mb-4 font-display text-2xl font-medium">
        Description
      </h2>

      <p className="leading-8 whitespace-pre-line text-muted-foreground">
        {property.description}
      </p>

    </section>
  );
}