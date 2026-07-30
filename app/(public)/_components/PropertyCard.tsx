import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
    const image =
        property.images?.[0] ||
        "https://placehold.co/600x400?text=No+Image";

    return (
        <Card className="overflow-hidden">
            <div className="relative h-60">
                <Image
                    src={image}
                    alt={property.title}
                    fill
                    className="object-cover"
                />
            </div>

            <CardContent className="space-y-2 pt-4">
                <h3 className="text-xl font-semibold">
                    {property.title}
                </h3>

                <p className="text-muted-foreground">
                    {property.location}
                </p>

                <p className="text-lg font-bold text-primary">
                    ${property.price}/month
                </p>
            </CardContent>

            <CardFooter>
                <Link
                    href={`/properties/${property.id}`}
                    className="w-full"
                >
                    <Button className="w-full">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}