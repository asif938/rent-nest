"use server";

import { cookies } from "next/headers";

export async function createPayment(
  rentalRequestId: string
) {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rentalRequestId,
      }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Payment creation failed");
  }

  return result.data;
}