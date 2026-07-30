type Query = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  available?: string;
  page?: string;
};

export async function getProperties(
  query?: Query
) {
  const params = new URLSearchParams();

  if (query?.search)
    params.append("search", query.search);

  if (query?.category)
    params.append("category", query.category);

  if (query?.minPrice)
    params.append("minPrice", query.minPrice);

  if (query?.maxPrice)
    params.append("maxPrice", query.maxPrice);

  if (query?.available)
    params.append("available", query.available);

  if (query?.page)
    params.append("page", query.page);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result = await res.json();

  return result.data;
}