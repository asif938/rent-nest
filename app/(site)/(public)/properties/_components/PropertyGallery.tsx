"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";
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
        <Image
          src={images[active]}
          alt={property.title}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
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
              <Image
                src={image}
                alt={`${property.title} photo ${index + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
