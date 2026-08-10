import { Payment } from "@/types/payment";

type Props = {
  rentalRequest: Payment["rentalRequest"];
};

export default function PaymentRentalCard({
  rentalRequest,
}: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Rental Information
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Rental Request ID
          </p>

          <p className="mt-1 break-all font-medium">
            {rentalRequest.id}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Start Date
          </p>

          <p className="mt-1">
            {new Date(
              rentalRequest.startDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            End Date
          </p>

          <p className="mt-1">
            {new Date(
              rentalRequest.endDate
            ).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}