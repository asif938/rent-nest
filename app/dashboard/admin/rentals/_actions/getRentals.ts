"use server";

import { cookies } from "next/headers";

import { AdminRental } from "@/types/admin";

export async function getRentals(): Promise<AdminRental[]> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/rentals`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rentals.");
  }

  const result = await res.json();

  return result.data;
}
