"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import RequestRentDialog from "./RequestRentDialog";

type Props = {
  propertyId: string;
  user: {
    id: string;
    role: string;
  } | null;
};

export default function RequestRentButton({
  propertyId,
  user,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!user) {
      router.push(
        `/login?redirectTo=/properties/${propertyId}`
      );
      return;
    }

    if (user.role !== "TENANT") {
      toast.error(
        "Only tenants can request a rental."
      );
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleClick}
      >
        Request To Rent
      </Button>

      <RequestRentDialog
        propertyId={propertyId}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}