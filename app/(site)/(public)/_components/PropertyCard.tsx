import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import PropertyImage from "@/components/shared/PropertyImage";

type Property = {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
};

type Props = {
    property: Property;
};

export default function PropertyCard({ property }: Props) {
    const image = property.images?.[0];

    return (
        <Link
            href={`/properties/${property.id}`}
            className="group block"
        >
            <Card className="overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30">
                <div className="relative h-56 overflow-hidden bg-muted">
                    <PropertyImage
                        src={image}
                        alt={property.title}
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-3 right-3 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur">
                        ${property.price}
                        <span className="font-normal text-muted-foreground">
                            /mo
                        </span>
                    </div>
                </div>

                <CardContent className="space-y-2 pt-4 pb-4">
                    <h3 className="line-clamp-1 text-lg font-semibold">
                        {property.title}
                    </h3>

                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {property.location}
                    </p>

                    <span className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        View Details
                        <ArrowUpRight size={15} />
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
}
