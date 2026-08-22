export async function getSingleProperty(id: string) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  const result = await res.json();

  return result.data;
}