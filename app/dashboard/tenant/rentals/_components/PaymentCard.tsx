import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Payment } from "@/types/payment";

type Props = {
    payment: Payment;
};

export default function PaymentCard({
    payment,
}: Props) {
    return (
        <div className="rounded-xl border p-6">

            <h2 className="mb-5 text-xl font-semibold">
                Payment
            </h2>

            {!payment ? (
                <>
                    <p className="mb-6 text-muted-foreground">
                        Payment has not been completed yet.
                    </p>

                    <Link href="#">
                        <Button>
                            Pay Now
                        </Button>
                    </Link>
                </>
            ) : (
                <div className="space-y-3">

                    <p>
                        Amount:
                        <strong>
                            {" "}
                            ৳{payment.amount}
                        </strong>
                    </p>

                    <p>Status: {payment.status}</p>

                </div>
            )}

        </div>
    );
}