"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") ?? ""
  );

  const [role, setRole] = useState(searchParams.get("role") ?? "all");

  function applyFilters(nextSearchTerm: string, nextRole: string) {
    const params = new URLSearchParams();

    if (nextSearchTerm) params.set("searchTerm", nextSearchTerm);
    if (nextRole !== "all") params.set("role", nextRole);

    router.push(`/dashboard/admin/users?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <form
        className="flex flex-1 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters(searchTerm, role);
        }}
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          className="rounded-full"
        >
          Search
        </Button>
      </form>

      <Select
        value={role}
        onValueChange={(value) => {
          const next = value ?? "all";
          setRole(next);
          applyFilters(searchTerm, next);
        }}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="TENANT">Tenant</SelectItem>
          <SelectItem value="LANDLORD">Landlord</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
