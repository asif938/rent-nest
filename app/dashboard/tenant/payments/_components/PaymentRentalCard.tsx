import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import { Payment } from "@/types/payment";

type Props = {
  rentalRequest: Payment["rentalRequest"];
};

export default function PaymentRentalCard({
  rentalRequest,
}: Props) {
  return (
    <DetailCard title="Rental Information">

      <DetailRow label="Rental Request ID">
        <p className="break-all font-medium">
          {rentalRequest.id}
        </p>
      </DetailRow>

      <DetailRow label="Start Date">
        <p>
          {new Date(rentalRequest.startDate).toLocaleDateString()}
        </p>
      </DetailRow>

      <DetailRow label="End Date">
        <p>
          {new Date(rentalRequest.endDate).toLocaleDateString()}
        </p>
      </DetailRow>

    </DetailCard>
  );
}
