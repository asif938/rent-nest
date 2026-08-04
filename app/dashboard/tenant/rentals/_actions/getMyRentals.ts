import { cookies } from "next/headers";

type Query = {
  search?: string;
  status?: string;
  page?: string;
};

export async function getMyRentals(query?: Query) {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const params = new URLSearchParams();

  if (query?.search) {
    params.set("search", query.search);
  }

  if (query?.status) {
    params.set("status", query.status);
  }

  if (query?.page) {
    params.set("page", query.page);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rentals.");
  }

  const result = await res.json();

  return result.data;
}