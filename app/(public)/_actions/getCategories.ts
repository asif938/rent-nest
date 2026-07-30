import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await res.json();

  return result.data;
}