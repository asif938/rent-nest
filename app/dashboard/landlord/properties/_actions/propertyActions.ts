"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { PropertyInput } from "@/lib/validations/property";

export type ErrorDetail = {
  field: string;
  message: string;
};

export type PropertyActionState = {
  success: boolean;
  message: string;
  errorDetails?: ErrorDetail[];
};

export async function createProperty(
  payload: PropertyInput
): Promise<PropertyActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to create property.",
      errorDetails: result.errorDetails,
    };
  }

  revalidatePath("/dashboard/landlord/properties");

  return {
    success: true,
    message: result.message || "Property created successfully.",
  };
}

export async function updateProperty(
  id: string,
  payload: Partial<PropertyInput> & { isAvailable?: boolean }
): Promise<PropertyActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update property.",
      errorDetails: result.errorDetails,
    };
  }

  revalidatePath("/dashboard/landlord/properties");

  return {
    success: true,
    message: result.message || "Property updated successfully.",
  };
}

export async function deleteProperty(
  id: string
): Promise<PropertyActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to delete property.",
    };
  }

  revalidatePath("/dashboard/landlord/properties");

  return {
    success: true,
    message: result.message || "Property deleted successfully.",
  };
}
