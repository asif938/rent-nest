export async function getFeaturedProperties() {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result = await res.json();

  return result.data.slice(0, 6);
}