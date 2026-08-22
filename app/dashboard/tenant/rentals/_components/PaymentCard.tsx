import { Badge } from "@/components/ui/badge";
import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import PayNowButton from "../../payments/_components/PayNowButton";
import { Payment } from "@/types/payment";
import { RentalStatus } from "@/types/rental";

type Props = {
    payment: Payment | null;
    rentalRequestId: string;
    rentalStatus: RentalStatus;
};

export default function PaymentCard({
    payment,
    rentalRequestId,
    rentalStatus,
}: Props) {
    return (
        <DetailCard title="Payment">

            {!payment ? (
                <div className="space-y-4">
                    {rentalStatus === "APPROVED" ? (
                        <>
                            <p className="text-muted-foreground">
                                Your request has been approved. Complete payment to
                                confirm this rental.
                            </p>

                            <PayNowButton
                                rentalRequestId={rentalRequestId}
                                className="w-full sm:w-auto"
                            />
                        </>
                    ) : rentalStatus === "PENDING" ? (
                        <p className="text-muted-foreground">
                            Waiting for the landlord to approve your request before
                            payment can be made.
                        </p>
                    ) : rentalStatus === "REJECTED" ? (
                        <p className="text-muted-foreground">
                            This rental request was rejected, so no payment is
                            required.
                        </p>
                    ) : (
                        <p className="text-muted-foreground">
                            Payment has not been completed yet.
                        </p>
                    )}
                </div>
            ) : (
                <>
                    <DetailRow label="Amount">
                        <p className="text-xl font-semibold text-primary">
                            ৳{payment.amount.toLocaleString()}
                        </p>
                    </DetailRow>

                    <DetailRow label="Status">
                        <Badge
                            variant={
                                payment.status === "COMPLETED"
                                    ? "default"
                                    : payment.status === "FAILED"
                                        ? "destructive"
                                        : "secondary"
                            }
                            className="rounded-full"
                        >
                            {payment.status}
                        </Badge>
                    </DetailRow>
                </>
            )}

        </DetailCard>
    );
}
