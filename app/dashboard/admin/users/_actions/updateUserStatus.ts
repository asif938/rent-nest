"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type UpdateUserStatusResult = {
  success: boolean;
  message: string;
};

export async function updateUserStatus(
  userId: string,
  isBanned: boolean
): Promise<UpdateUserStatusResult> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isBanned }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update user status.",
    };
  }

  revalidatePath("/dashboard/admin/users");

  return {
    success: true,
    message: result.message || "User status updated successfully.",
  };
}
