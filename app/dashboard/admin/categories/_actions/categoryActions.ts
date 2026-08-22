"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type CategoryActionState = {
  success: boolean;
  message: string;
};

export async function createCategory(
  name: string
): Promise<CategoryActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to create category.",
    };
  }

  revalidatePath("/dashboard/admin/categories");

  return {
    success: true,
    message: "Category created successfully.",
  };
}

export async function updateCategory(
  id: string,
  name: string
): Promise<CategoryActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update category.",
    };
  }

  revalidatePath("/dashboard/admin/categories");

  return {
    success: true,
    message: "Category updated successfully.",
  };
}

export async function deleteCategory(
  id: string
): Promise<CategoryActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
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
      message: result.message || "Failed to delete category.",
    };
  }

  revalidatePath("/dashboard/admin/categories");

  return {
    success: true,
    message: "Category deleted successfully.",
  };
}
