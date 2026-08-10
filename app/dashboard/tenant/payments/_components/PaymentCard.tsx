"use client";

import { Button } from "@/components/ui/button";
import { createPayment } from "../_actions/createPayment";

type Props = {
  rentalRequestId: string;
};

export default function PayNowButton({
  rentalRequestId,
}: Props) {
  async function handlePayment() {
    try {
      const result = await createPayment(rentalRequestId);

      window.location.href = result.checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Unable to start payment.");
    }
  }

  return (
    <Button onClick={handlePayment}>
      Pay Now
    </Button>
  );
}