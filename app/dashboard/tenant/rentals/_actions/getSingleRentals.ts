"use server";

import { cookies } from "next/headers";

import { Rental } from "@/types/rental";

export async function getSingleRentals(id: string): Promise<Rental> {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rental.");
  }

  const result = await res.json();

  return result.data;
}