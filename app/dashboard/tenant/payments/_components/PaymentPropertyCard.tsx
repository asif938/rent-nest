import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import { Payment } from "@/types/payment";

type Props = {
  property: Payment["rentalRequest"]["property"];
};

export default function PaymentPropertyCard({
  property,
}: Props) {
  return (
    <DetailCard title="Property">

      <DetailRow label="Property">
        <p className="font-medium">
          {property.title}
        </p>
      </DetailRow>

      <DetailRow label="Location">
        <p>{property.location}</p>
      </DetailRow>

      <DetailRow label="Monthly Rent">
        <p className="font-semibold text-primary">
          ৳{property.price.toLocaleString()}
        </p>
      </DetailRow>

    </DetailCard>
  );
}
