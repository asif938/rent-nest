import { Mail } from "lucide-react";

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

      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Listed by
      </p>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-semibold text-primary">
          {landlord.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold">
            {landlord.name}
          </p>

          <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
            <Mail size={13} />
            {landlord.email}
          </p>
        </div>
      </div>

    </Card>
  );
}
