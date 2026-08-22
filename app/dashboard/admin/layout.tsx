import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getMe } from "@/lib/getMe";

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: Props) {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
