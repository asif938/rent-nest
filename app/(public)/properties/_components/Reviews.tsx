import { Property } from "@/types/property";

type ReviewsSectionProps = {
  property: Property;
};

export default function ReviewsSection({
  property,
}: ReviewsSectionProps) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">
        Reviews
      </h2>

      <p className="text-muted-foreground">
        Reviews for property: {property.title}
      </p>
    </section>
  );
}