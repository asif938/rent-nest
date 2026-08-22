"use server";

import { cookies } from "next/headers";

import { LandlordRentalRequest } from "@/types/landlord";

export type LandlordRequestsResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: LandlordRentalRequest[];
};

export async function getRequests(query?: {
  status?: string;
  page?: string;
}): Promise<LandlordRequestsResponse> {
  const token = (await cookies()).get("accessToken")?.value;

  const params = new URLSearchParams();

  if (query?.status) params.set("status", query.status);
  if (query?.page) params.set("page", query.page);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rental requests.");
  }

  const result = await res.json();

  return {
    meta: result.meta,
    data: result.data,
  };
}
