// import DesktopMenu from "./DesktopMenu";
import DesktopMenu from "./DekstopMenu";
import ProfileDropdown from "./ProfileDropdown";

type User = {
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
};

type Props = {
  user: User;
};

export default function UserNav({ user }: Props) {
  let menus = [];

  switch (user.role) {
    case "TENANT":
      menus = [
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
      break;

    case "LANDLORD":
      menus = [
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
      break;

    case "ADMIN":
      menus = [
        {
          label: "Dashboard",
          href: "/dashboard/admin",
        },
      ];
      break;
  }

  return (
    <>
      <DesktopMenu items={menus} />

      <ProfileDropdown user={user} />
    </>
  );
}