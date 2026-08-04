import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getMe } from "@/lib/getMe";

type Props = {
  children: ReactNode;
};

export default async function TenantLayout({
  children,
}: Props) {
  const user = await getMe();

  // Not logged in
  if (!user) {
    redirect("/login");
  }

  // Logged in but not a tenant
  if (user.role !== "TENANT") {
    redirect("/");
  }

  return <>{children}</>;
}