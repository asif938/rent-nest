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
import { updateUserStatus } from "../_actions/updateUserStatus";

type Props = {
  userId: string;
  userName: string;
  isBanned: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function BanUserDialog({
  userId,
  userName,
  isBanned,
  open,
  setOpen,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const nextState = !isBanned;

  async function handleConfirm() {
    setPending(true);

    const result = await updateUserStatus(userId, nextState);

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
          <DialogTitle>
            {nextState ? "Ban User" : "Unban User"}
          </DialogTitle>

          <DialogDescription>
            {nextState
              ? `Are you sure you want to ban ${userName}? They will lose access to their account.`
              : `Restore account access for ${userName}?`}
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
            variant={nextState ? "destructive" : "default"}
            className="rounded-full"
            onClick={handleConfirm}
            disabled={pending}
          >
            {pending
              ? "Saving..."
              : nextState
                ? "Ban User"
                : "Unban User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
