"use client";

import { useState } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ReviewFormDialog from "./ReviewFormDialog";
import DeleteReviewDialog from "./DeleteReviewDialog";
import type { PropertyReview } from "../_actions/reviewActions";

type Props = {
  propertyId: string;
  review: PropertyReview;
};

export default function YourReviewCard({
  propertyId,
  review,
}: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border/70 bg-muted/30 p-4">

      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < review.rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30"
              }
            />
          ))}
        </div>

        <div className="flex shrink-0 gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditOpen(true)}
            aria-label="Edit review"
          >
            <Pencil size={14} />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDeleteOpen(true)}
            aria-label="Delete review"
          >
            <Trash2 size={14} />
          </Button>
        </div>

      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {review.comment}
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Reviewed on {new Date(review.createdAt).toLocaleDateString()}
      </p>

      <ReviewFormDialog
        propertyId={propertyId}
        open={editOpen}
        setOpen={setEditOpen}
        existingReview={review}
      />

      <DeleteReviewDialog
        reviewId={review.id}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />

    </div>
  );
}
