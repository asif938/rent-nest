"use server";

import { cookies } from "next/headers";

import { Payment } from "@/types/payment";

export async function getLatestPayment(): Promise<Payment | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments?limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const result = await res.json();

  return result.data?.[0] ?? null;
}
