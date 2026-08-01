import { Card } from "@/components/ui/card";
import { Landlord } from "@/types/property";

type Props = {
  landlord: Landlord;
};

export default function LandlordCard({
  landlord,
}: Props) {
  return (
    <Card className="p-6">

      <h3 className="text-xl font-bold">
        Landlord
      </h3>

      <p className="mt-4">
        {landlord.name}
      </p>

      <p className="text-muted-foreground">
        {landlord.email}
      </p>

    </Card>
  );
}