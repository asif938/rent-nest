import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Review } from "@/types/review";

type Props = {
  review: Review;
};

export default function TestimonialCard({ review }: Props) {
  return (
    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex h-full flex-col gap-5 p-6">

        <div className="flex items-start justify-between">
          <div className="flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className="fill-primary text-primary"
              />
            ))}
          </div>

          <Quote
            size={28}
            className="text-primary/15"
          />
        </div>

        <p className="line-clamp-4 flex-1 text-muted-foreground">
          {review.comment}
        </p>

        <div className="flex items-center gap-3 border-t border-border/70 pt-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-semibold text-primary">
            {review.tenant.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4 className="text-sm font-semibold">
              {review.tenant.name}
            </h4>

            <p className="text-xs text-muted-foreground">
              Stayed at {review.property.title}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
