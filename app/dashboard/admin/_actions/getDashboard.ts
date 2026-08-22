"use server";

import { cookies } from "next/headers";

import { AdminDashboard } from "@/types/admin";

export async function getDashboard(): Promise<AdminDashboard> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/dashboard`,
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
