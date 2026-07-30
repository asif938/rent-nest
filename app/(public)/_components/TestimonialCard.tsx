import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Review } from "@/types/review";

type Props = {
  review: Review;
};

export default function TestimonialCard({ review }: Props) {
  return (
    <Card className="h-full transition hover:shadow-lg">
      <CardContent className="space-y-5 p-6">

        <div className="flex gap-1">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className="fill-yellow-500 text-yellow-500"
            />
          ))}
        </div>

        <p className="line-clamp-4 italic text-muted-foreground">
          {review.comment}
        </p>

        <div className="border-t pt-4">
          <h4 className="font-semibold">
            {review.tenant.name}
          </h4>

          <p className="text-sm text-muted-foreground">
            Stayed at {review.property.title}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}