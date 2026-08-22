"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { reviewSchema, type ReviewInput } from "@/lib/validations/review";
import {
  createReview,
  updateReview,
  type PropertyReview,
} from "../_actions/reviewActions";

type Props = {
  propertyId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  existingReview?: PropertyReview;
};

export default function ReviewFormDialog({
  propertyId,
  open,
  setOpen,
  existingReview,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const isEditMode = !!existingReview;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: existingReview?.rating ?? 0,
      comment: existingReview?.comment ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setPending(true);

    const result = isEditMode
      ? await updateReview(existingReview.id, data.rating, data.comment)
      : await createReview(propertyId, data.rating, data.comment);

    setPending(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      reset();
      router.refresh();
    } else {
      toast.error(result.message);
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Your Review" : "Leave a Review"}
          </DialogTitle>

          <DialogDescription>
            Share your experience with this property to help other tenants.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>Rating</Label>

            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className="p-0.5"
                      aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                    >
                      <Star
                        size={26}
                        className={cn(
                          "transition-colors",
                          value <= field.value
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/40"
                        )}
                      />
                    </button>
                  ))}
                </div>
              )}
            />

            {errors.rating && (
              <p className="text-sm text-destructive">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>

            <Textarea
              id="comment"
              placeholder="Tell others about your experience..."
              aria-invalid={!!errors.comment}
              {...register("comment")}
            />

            {errors.comment && (
              <p className="text-sm text-destructive">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={pending}
          >
            {pending
              ? "Saving..."
              : isEditMode
                ? "Update Review"
                : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
