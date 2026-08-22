import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import { Property } from "@/types/property";

type ReviewsSectionProps = {
  property: Property;
};

export default function ReviewsSection({
  property,
}: ReviewsSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium">
          Reviews
        </h2>

        <p className="text-muted-foreground">
          {property.reviews.length} Review
          {property.reviews.length !== 1 && "s"}
        </p>
      </div>

      {property.reviews.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">
              No reviews yet.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Be the first tenant to review this property.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {property.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="space-y-4 p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display font-semibold text-primary">
                      T
                    </div>

                    <div>
                      <h4 className="font-semibold">
                        Tenant
                      </h4>

                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({
                      length: review.rating,
                    }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="fill-primary text-primary"
                      />
                    ))}
                  </div>

                </div>

                <p className="leading-7 text-muted-foreground">
                  {review.comment}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}