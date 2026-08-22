import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import { Payment } from "@/types/payment";

type Props = {
    payment: Payment | null;
};

export default function PaymentCard({
    payment,
}: Props) {
    return (
        <DetailCard title="Payment">

            {!payment ? (
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        Payment has not been completed yet.
                    </p>

                    <Link href="#">
                        <Button className="rounded-full">
                            Pay Now
                        </Button>
                    </Link>
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
