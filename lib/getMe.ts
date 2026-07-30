import { cookies } from "next/headers";

export async function getMe() {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) return null;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const result = await res.json();

  return result.data;
}