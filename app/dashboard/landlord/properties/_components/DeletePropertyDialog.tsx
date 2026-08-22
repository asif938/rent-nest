"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "../_actions/propertyActions";

type Props = {
  propertyId: string;
  propertyTitle: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function DeletePropertyDialog({
  propertyId,
  propertyTitle,
  open,
  setOpen,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);

    const result = await deleteProperty(propertyId);

    setPending(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete &ldquo;{propertyTitle}&rdquo;?
            This cannot be undone. Properties with existing rental requests
            cannot be deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="rounded-full"
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
