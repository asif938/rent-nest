"use client";

import { useState } from "react";
import { Users as UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BanUserDialog from "./BanUserDialog";
import type { AdminUser } from "@/types/admin";

type Props = {
  users: AdminUser[];
};

const ROLE_VARIANT: Record<AdminUser["role"], "default" | "secondary" | "outline"> = {
  ADMIN: "default",
  LANDLORD: "secondary",
  TENANT: "outline",
};

export default function UsersTable({
  users,
}: Props) {
  const [target, setTarget] = useState<AdminUser | null>(null);

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
        <UsersIcon
          size={32}
          className="mb-3 text-muted-foreground/50"
        />

        <h3 className="text-lg font-semibold">No users found</h3>

        <p className="mt-2 text-muted-foreground">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border/70 bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Joined
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border/70 last:border-none hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-semibold text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <Badge
                    variant={ROLE_VARIANT[user.role]}
                    className="rounded-full"
                  >
                    {user.role}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <Badge
                    variant={user.isBanned ? "destructive" : "outline"}
                    className="rounded-full"
                  >
                    {user.isBanned ? "Banned" : "Active"}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-right">
                  {user.role !== "ADMIN" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className={
                        user.isBanned
                          ? "rounded-full"
                          : "rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      }
                      onClick={() => setTarget(user)}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {target && (
        <BanUserDialog
          userId={target.id}
          userName={target.name}
          isBanned={!!target.isBanned}
          open={!!target}
          setOpen={(open) => {
            if (!open) setTarget(null);
          }}
        />
      )}
    </>
  );
}
