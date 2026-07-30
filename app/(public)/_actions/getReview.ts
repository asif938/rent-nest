import { Review } from "@/types/review";

export async function getReviews(): Promise<Review[]> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const result = await res.json();

  return result.data.slice(0, 6);
}