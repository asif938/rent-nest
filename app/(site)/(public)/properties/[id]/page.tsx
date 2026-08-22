import type { Metadata } from "next";

import { getMe } from "@/lib/getMe";
import { getSingleProperty } from "../../_actions/getSingleProperty";
import LandlordCard from "../_components/LandlordCard";
import PropertyAmenities from "../_components/PropertyAmenities";
import PropertyDescription from "../_components/PropertyDescription";
import PropertyGallery from "../_components/PropertyGallery";
import PropertyInfo from "../_components/PropertyInfo";
import RequestRentButton from "../_components/RequestButton";
import ReviewsSection from "../_components/Reviews";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const property = await getSingleProperty(id);

    return {
      title: `${property.title} — ${property.location}`,
      description: property.description?.slice(0, 160),
    };
  } catch {
    return { title: "Property" };
  }
}

export default async function PropertyDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const user = await getMe();

  const property = await getSingleProperty(id);

  return (
    <main className="container py-10">

      <PropertyGallery property={property} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">

        <div className="space-y-10">

          <PropertyInfo property={property} />

          <PropertyAmenities property={property} />

          <PropertyDescription property={property} />

          <ReviewsSection property={property} />

        </div>

        <aside className="space-y-6">

          <LandlordCard landlord={property.landlord} />

          <RequestRentButton propertyId={property.id} user={user} />

        </aside>

      </div>

    </main>
  );
}