import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import { Rental } from "@/types/rental";

type Props = {
  rental: Rental;
};

export default function RentalInfoCard({
  rental,
}: Props) {
  return (
    <DetailCard title="Rental Information">

      <DetailRow label="Status">
        <RentalStatusBadge status={rental.status} />
      </DetailRow>

      <DetailRow label="Start Date">
        <p>
          {new Date(rental.startDate).toLocaleDateString()}
        </p>
      </DetailRow>

      <DetailRow label="End Date">
        <p>
          {new Date(rental.endDate).toLocaleDateString()}
        </p>
      </DetailRow>

      <DetailRow label="Requested On">
        <p>
          {new Date(rental.createdAt).toLocaleDateString()}
        </p>
      </DetailRow>

    </DetailCard>
  );
}
