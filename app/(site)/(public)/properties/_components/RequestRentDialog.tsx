"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    rentalRequestSchema,
    type RentalRequestInput,
} from "@/lib/validations/rental";
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

    const [state, formAction, pending] = useActionState(
        createRentalRequest.bind(null, propertyId),
        initialState
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RentalRequestInput>({
        resolver: zodResolver(rentalRequestSchema),
        defaultValues: {
            startDate: "",
            endDate: "",
        },
    });

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);

            reset();
            setOpen(false);

            router.refresh();
        } else {
            toast.error(state.message);
        }
    }, [state, router, setOpen, reset]);

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();

        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);

        formAction(formData);
    });

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
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label htmlFor="startDate">
                            Start Date
                        </Label>

                        <Input
                            id="startDate"
                            type="date"
                            aria-invalid={!!errors.startDate}
                            {...register("startDate")}
                        />

                        {errors.startDate && (
                            <p className="text-sm text-destructive">
                                {errors.startDate.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="endDate">
                            End Date
                        </Label>

                        <Input
                            id="endDate"
                            type="date"
                            aria-invalid={!!errors.endDate}
                            {...register("endDate")}
                        />

                        {errors.endDate && (
                            <p className="text-sm text-destructive">
                                {errors.endDate.message}
                            </p>
                        )}
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
