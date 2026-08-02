"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
};

export default function PropertyFilters({
  categories,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    searchParams.get("location") ?? ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") ?? ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") ?? ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") ?? ""
  );

  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") ?? "createdAt"
  );

  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") ?? "desc"
  );

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    if (category) {
      params.set("category", category);
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setLocation("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setSortOrder("desc");

    router.push("/properties");
  };

  return (
    <aside className="rounded-xl border bg-card p-5 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Filters
      </h2>

      <div className="space-y-5">

        {/* Location */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Location
          </label>

          <Input
            placeholder="Search by location..."
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}

        <div className="grid grid-cols-2 gap-3">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Min Price
            </label>

            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Max Price
            </label>

            <Input
              type="number"
              placeholder="50000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
            />
          </div>

        </div>

        {/* Sorting */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Sort By
          </label>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] =
                e.target.value.split("-");

              setSortBy(field);
              setSortOrder(order);
            }}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none"
          >
            <option value="createdAt-desc">
              Newest
            </option>

            <option value="createdAt-asc">
              Oldest
            </option>

            <option value="price-asc">
              Price: Low to High
            </option>

            <option value="price-desc">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* Buttons */}

        <div className="flex gap-3">

          <Button
            className="flex-1"
            onClick={handleFilter}
          >
            Apply
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>

        </div>

      </div>
    </aside>
  );
}