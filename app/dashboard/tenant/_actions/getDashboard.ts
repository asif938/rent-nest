import { cookies } from "next/headers";

export async function getDashboard() {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/tenant/dashboard`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },

      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch dashboard."
    );
  }

  const result = await res.json();

  return result.data;
}