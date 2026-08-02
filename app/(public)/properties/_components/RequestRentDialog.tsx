"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    createRentalRequest,
    type RentalRequestState,
} from "../_actions/rentalActions";

type Props = {
    propertyId: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: RentalRequestState = {
    success: false,
    message: "",
};

export default function RequestRentDialog({
    propertyId,
    open,
    setOpen,
}: Props) {
    const router = useRouter();

    const [state, action, pending] = useActionState(
        createRentalRequest.bind(null, propertyId),
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);

            setOpen(false);

            router.refresh();
        } else {
            toast.error(state.message);
        }
    }, [state, router, setOpen]);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Request Rental
                    </DialogTitle>

                    <DialogDescription>
                        Select your rental period and submit your rental request.
                    </DialogDescription>
                </DialogHeader>

                <form
                    action={action}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="startDate"
                            className="text-sm font-medium"
                        >
                            Start Date
                        </label>

                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="endDate"
                            className="text-sm font-medium"
                        >
                            End Date
                        </label>

                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={pending}
                    >
                        {pending ? "Submitting..." : "Submit Request"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}