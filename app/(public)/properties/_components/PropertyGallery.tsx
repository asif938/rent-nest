import { Property } from "@/types/property";
import Image from "next/image";

type Props = {
  property: Property;
};

export default function PropertyGallery({
  property,
}: Props) {
  const image =
    property.images?.[0] ??
    "/no-image.png";

  return (
    <div className="relative h-112.5 overflow-hidden rounded-xl">

      <Image
        src={image}
        alt={property.title}
        fill
        className="object-cover"
      />

    </div>
  );
}