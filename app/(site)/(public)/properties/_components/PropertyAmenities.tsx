import {
  Car,
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
  Sofa,
  Waves,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";

import { Property } from "@/types/property";

type Props = {
  property: Property;
};

const ICONS: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  ac: Wind,
  "air conditioning": Wind,
  security: ShieldCheck,
  generator: Zap,
  furnished: Sofa,
  pool: Waves,
  gym: Dumbbell,
};

export default function PropertyAmenities({
  property,
}: Props) {
  if (!property.amenities.length) return null;

  return (
    <section>

      <h2 className="mb-5 font-display text-2xl font-medium">
        Amenities
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

        {property.amenities.map((item: string) => {
          const Icon = ICONS[item.toLowerCase()] ?? CheckCircle2;

          return (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm"
            >
              <Icon
                size={17}
                className="shrink-0 text-primary"
              />
              <span className="truncate">{item}</span>
            </div>
          );
        })}

      </div>

    </section>
  );
}
