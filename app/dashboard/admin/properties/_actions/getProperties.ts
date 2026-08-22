"use server";

import { cookies } from "next/headers";

import { AdminProperty } from "@/types/admin";

export async function getProperties(): Promise<AdminProperty[]> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/properties`,
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

  return result.data;
}
