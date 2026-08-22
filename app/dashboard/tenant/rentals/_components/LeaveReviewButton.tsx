"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import ReviewFormDialog from "./ReviewFormDialog";

type Props = {
  propertyId: string;
};

export default function LeaveReviewButton({
  propertyId,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <Star size={15} />
        Leave a Review
      </Button>

      <ReviewFormDialog
        propertyId={propertyId}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
