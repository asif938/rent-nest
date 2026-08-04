import {
    CreditCard,
    FileText,
    Home,
    LayoutDashboard,
    Settings,
    User,
    Users,
} from "lucide-react";

export const dashboardMenus = {
    TENANT: [
        {
            label: "Dashboard",
            href: "/tenant",
            icon: LayoutDashboard,
        },
        {
            label: "My Requests",
            href: "/tenant/requests",
            icon: FileText,
        },
        {
            label: "Payments",
            href: "/tenant/payments",
            icon: CreditCard,
        },
        {
            label: "Profile",
            href: "/tenant/profile",
            icon: User,
        },
    ],

    LANDLORD: [
        {
            label: "Dashboard",
            href: "/landlord",
            icon: LayoutDashboard,
        },
        {
            label: "Properties",
            href: "/landlord/properties",
            icon: Home,
        },
        {
            label: "Rental Requests",
            href: "/landlord/requests",
            icon: FileText,
        },
        {
            label: "Profile",
            href: "/landlord/profile",
            icon: User,
        },
    ],

    ADMIN: [
        {
            label: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            label: "Users",
            href: "/admin/users",
            icon: Users,
        },
        {
            label: "Properties",
            href: "/admin/properties",
            icon: Home,
        },
        {
            label: "Settings",
            href: "/admin/settings",
            icon: Settings,
        },
    ],
};