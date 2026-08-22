"use server";

import { cookies } from "next/headers";

import { LandlordDashboard } from "@/types/landlord";

export async function getDashboard(): Promise<LandlordDashboard> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard.");
  }

  const result = await res.json();

  return result.data;
}
