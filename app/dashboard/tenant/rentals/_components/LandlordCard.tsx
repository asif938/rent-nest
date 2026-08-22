import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";
import { Rental } from "@/types/rental";

type Props = {
  landlord: NonNullable<Rental["property"]["landlord"]>;
};

export default function LandlordCard({
  landlord,
}: Props) {
  return (
    <DetailCard title="Landlord">

      <DetailRow label="Name">
        <p className="font-medium">{landlord.name}</p>
      </DetailRow>

      <DetailRow label="Email">
        <p>{landlord.email}</p>
      </DetailRow>

    </DetailCard>
  );
}
