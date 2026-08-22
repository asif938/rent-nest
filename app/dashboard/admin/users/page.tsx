import type { Metadata } from "next";

import { getUsers } from "./_actions/getUsers";
import UsersTable from "./_components/UsersTable";
import UserFilters from "./_components/UserFilters";
import Pagination from "@/app/dashboard/_components/Pagination";

export const metadata: Metadata = {
  title: "Users",
};

type Props = {
  searchParams: Promise<{
    searchTerm?: string;
    role?: string;
    page?: string;
  }>;
};

export default async function AdminUsersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const { data: users, meta } = await getUsers(params);

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage tenant and landlord accounts.
        </p>
      </div>

      <UserFilters />

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <UsersTable users={users} />

        <Pagination
          page={meta.page}
          totalPages={totalPages}
          buildHref={(page) => {
            const nextParams = new URLSearchParams();

            if (params.searchTerm) nextParams.set("searchTerm", params.searchTerm);
            if (params.role) nextParams.set("role", params.role);
            nextParams.set("page", String(page));

            return `/dashboard/admin/users?${nextParams.toString()}`;
          }}
        />
      </div>
    </div>
  );
}
