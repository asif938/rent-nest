import {
    CreditCard,
    FileText,
    Home,
    LayoutDashboard,
    Tag,
    Users,
} from "lucide-react";

export const dashboardMenus = {
    TENANT: [
        {
            label: "Dashboard",
            href: "/dashboard/tenant",
            icon: LayoutDashboard,
        },
        {
            label: "My Rentals",
            href: "/dashboard/tenant/rentals",
            icon: FileText,
        },
        {
            label: "Payments",
            href: "/dashboard/tenant/payments",
            icon: CreditCard,
        },
    ],

    LANDLORD: [
        {
            label: "Dashboard",
            href: "/dashboard/landlord",
            icon: LayoutDashboard,
        },
        {
            label: "Properties",
            href: "/dashboard/landlord/properties",
            icon: Home,
        },
        {
            label: "Rental Requests",
            href: "/dashboard/landlord/requests",
            icon: FileText,
        },
    ],

    ADMIN: [
        {
            label: "Dashboard",
            href: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            label: "Users",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            label: "Properties",
            href: "/dashboard/admin/properties",
            icon: Home,
        },
        {
            label: "Rentals",
            href: "/dashboard/admin/rentals",
            icon: FileText,
        },
        {
            label: "Categories",
            href: "/dashboard/admin/categories",
            icon: Tag,
        },
    ],
};
