import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyDescription({
  property,
}: Props) {
  return (
    <section>

      <h2 className="mb-4 text-2xl font-bold">
        Description
      </h2>

      <p className="leading-8 text-muted-foreground">
        {property.description}
      </p>

    </section>
  );
}