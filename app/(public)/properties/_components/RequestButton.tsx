"use client";

import { Button } from "@/components/ui/button";

type Props = {
  propertyId: string;
};

export default function RequestRentButton({
  propertyId,
}: Props) {
  return (
    <Button
      className="w-full"
      size="lg"
    >
      Request To Rent
    </Button>
  );
}