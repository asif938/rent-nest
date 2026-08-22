"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";
import PropertyImage from "@/components/shared/PropertyImage";
import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyGallery({
  property,
}: Props) {
  const images = property.images ?? [];

  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-muted md:h-[28rem]">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
          <ImageOff size={36} />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-muted md:h-[28rem]">
        <PropertyImage
          key={images[active]}
          src={images[active]}
          alt={property.title}
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          iconSize={48}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-transparent transition-all",
                active === index
                  ? "ring-primary"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <PropertyImage
                src={image}
                alt={`${property.title} photo ${index + 1}`}
                sizes="112px"
                iconSize={20}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
