import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyAmenities({
  property,
}: Props) {
  return (
    <section>

      <h2 className="mb-5 text-2xl font-bold">
        Amenities
      </h2>

      <div className="flex flex-wrap gap-3">

        {property.amenities.map(
          (item: string) => (
            <span
              key={item}
              className="rounded-full bg-muted px-4 py-2"
            >
              {item}
            </span>
          )
        )}

      </div>

    </section>
  );
}