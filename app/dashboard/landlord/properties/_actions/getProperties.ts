"use server";

import { cookies } from "next/headers";

import { LandlordProperty } from "@/types/landlord";

export type LandlordPropertiesResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: LandlordProperty[];
};

export async function getProperties(query?: {
  page?: string;
  isAvailable?: string;
}): Promise<LandlordPropertiesResponse> {
  const token = (await cookies()).get("accessToken")?.value;

  const params = new URLSearchParams();

  if (query?.page) params.set("page", query.page);
  if (query?.isAvailable) params.set("isAvailable", query.isAvailable);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties.");
  }

  const result = await res.json();

  return {
    meta: result.meta,
    data: result.data,
  };
}
