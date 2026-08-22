"use server";

import { cookies } from "next/headers";

import { AdminUser } from "@/types/admin";

export type AdminUsersResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: AdminUser[];
};

export async function getUsers(query?: {
  searchTerm?: string;
  role?: string;
  page?: string;
}): Promise<AdminUsersResponse> {
  const token = (await cookies()).get("accessToken")?.value;

  const params = new URLSearchParams();

  if (query?.searchTerm) params.set("searchTerm", query.searchTerm);
  if (query?.role) params.set("role", query.role);
  if (query?.page) params.set("page", query.page);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users.");
  }

  const result = await res.json();

  return {
    meta: result.meta,
    data: result.data,
  };
}
