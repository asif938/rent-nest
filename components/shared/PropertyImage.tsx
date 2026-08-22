"use client";

import { useState } from "react";
import Image from "next/image";
import { House } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  iconSize?: number;
  onClick?: () => void;
};

export default function PropertyImage({
  src,
  alt,
  sizes,
  priority,
  className,
  iconSize = 40,
  onClick,
}: Props) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        onClick={onClick}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted"
      >
        <House
          size={iconSize}
          className="text-muted-foreground/40"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onClick={onClick}
      onError={() => setErrored(true)}
      className={cn("object-cover", className)}
    />
  );
}
