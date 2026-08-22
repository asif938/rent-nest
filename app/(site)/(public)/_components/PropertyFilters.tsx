"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    searchParams.get("category") ?? "all"
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") ?? ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") ?? ""
  );

  const [sort, setSort] = useState(
    `${searchParams.get("sortBy") ?? "createdAt"}-${
      searchParams.get("sortOrder") ?? "desc"
    }`
  );

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    if (category && category !== "all") {
      params.set("category", category);
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    const [sortBy, sortOrder] = sort.split("-");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setLocation("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("createdAt-desc");

    router.push("/properties");
  };

  return (
    <aside className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <SlidersHorizontal
          size={18}
          className="text-primary"
        />

        <h2 className="text-lg font-semibold">
          Filters
        </h2>
      </div>

      <div className="space-y-5">

        <div className="space-y-2">
          <Label>Location</Label>

          <Input
            placeholder="City or neighborhood..."
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>

          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "all")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Categories
              </SelectItem>

              {categories.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.name}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div className="space-y-2">
            <Label>Min Price</Label>

            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Max Price</Label>

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

        <div className="space-y-2">
          <Label>Sort By</Label>

          <Select
            value={sort}
            onValueChange={(value) => setSort(value ?? "createdAt-desc")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="createdAt-desc">
                Newest
              </SelectItem>

              <SelectItem value="createdAt-asc">
                Oldest
              </SelectItem>

              <SelectItem value="price-asc">
                Price: Low to High
              </SelectItem>

              <SelectItem value="price-desc">
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 pt-2">

          <Button
            className="flex-1 rounded-full"
            onClick={handleFilter}
          >
            Apply Filters
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleReset}
            aria-label="Reset filters"
          >
            <RotateCcw size={16} />
          </Button>

        </div>

      </div>
    </aside>
  );
}
