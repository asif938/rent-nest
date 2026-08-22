import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getMe } from "@/lib/getMe";

type Props = {
  children: ReactNode;
};

export default async function LandlordLayout({
  children,
}: Props) {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "LANDLORD") {
    redirect("/");
  }

  return <>{children}</>;
}
