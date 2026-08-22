"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Star, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyImage from "@/components/shared/PropertyImage";
import AvailabilityToggle from "./AvailabilityToggle";
import DeletePropertyDialog from "./DeletePropertyDialog";
import type { LandlordProperty } from "@/types/landlord";

type Props = {
  property: LandlordProperty;
};

export default function PropertyManagementCard({
  property,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const image = property.images?.[0];

  return (
    <Card className="overflow-hidden py-0">
      <div className="relative h-44 bg-muted">
        <PropertyImage
          src={image}
          alt={property.title}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          iconSize={32}
        />

        <Badge
          variant={property.isAvailable ? "default" : "secondary"}
          className="absolute top-3 left-3 rounded-full"
        >
          {property.isAvailable ? "Available" : "Unavailable"}
        </Badge>
      </div>

      <CardContent className="space-y-3 pt-4 pb-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold">
            {property.title}
          </h3>

          <AvailabilityToggle
            propertyId={property.id}
            isAvailable={property.isAvailable}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {property.location}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="font-display text-lg font-medium text-primary">
            ${property.price}
            <span className="text-sm font-normal text-muted-foreground">
              /mo
            </span>
          </span>

          {property.totalReviews > 0 && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Star
                size={14}
                className="fill-primary text-primary"
              />
              {property.averageRating}
              <span className="text-xs">
                ({property.totalReviews})
              </span>
            </span>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <Link
            href={`/dashboard/landlord/properties/${property.id}/edit`}
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full"
            >
              <Pencil size={14} />
              Edit
            </Button>
          </Link>

          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setDeleteOpen(true)}
            aria-label="Delete property"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </CardContent>

      <DeletePropertyDialog
        propertyId={property.id}
        propertyTitle={property.title}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
    </Card>
  );
}
