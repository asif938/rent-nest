"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type UpdateStatusResult = {
  success: boolean;
  message: string;
};

export async function updateRequestStatus(
  requestId: string,
  status: "APPROVED" | "REJECTED"
): Promise<UpdateStatusResult> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update rental request.",
    };
  }

  revalidatePath("/dashboard/landlord/requests");
  revalidatePath("/dashboard/landlord");

  return {
    success: true,
    message: result.message || `Request ${status.toLowerCase()} successfully.`,
  };
}
