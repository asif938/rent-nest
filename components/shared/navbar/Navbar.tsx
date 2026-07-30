import Link from "next/link";

import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import DesktopMenu from "./DekstopMenu";
import ProfileDropdown from "./ProfileDropdown";

import { getMe } from "@/lib/getMe";

export default async function Navbar() {
  const user = await getMe();

  const guestMenus = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Properties",
      href: "/properties",
    },
  ];

  const tenantMenus = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Properties",
      href: "/properties",
    },
    {
      label: "Dashboard",
      href: "/dashboard/tenant",
    },
  ];

  const landlordMenus = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Properties",
      href: "/properties",
    },
    {
      label: "Dashboard",
      href: "/dashboard/landlord",
    },
  ];

  const adminMenus = [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
    },
  ];

  let menus = guestMenus;

  if (user) {
    switch (user.role) {
      case "TENANT":
        menus = tenantMenus;
        break;

      case "LANDLORD":
        menus = landlordMenus;
        break;

      case "ADMIN":
        menus = adminMenus;
        break;
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">

        <Logo />

        <DesktopMenu items={menus} />

        {!user ? (
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button>
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <ProfileDropdown user={user} />
        )}

      </div>
    </header>
  );
}