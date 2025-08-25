import { UserRole } from "@/types/user.types";
import { Calendar, Home, Inbox, Settings } from "lucide-react";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Optional: items shown to everyone
const COMMON: MenuItem[] = [];

// Role-specific menus (completely separate lists)
export const LANDLORD_MENU: MenuItem[] = [
  ...COMMON,
  { title: "Home", url: "/dashboard/landlord", icon: Home },
  {
    title: "Applications",
    url: "/dashboard/landlord/applications",
    icon: Inbox,
  },
  { title: "Calendar", url: "/dashboard/landlord/calendar", icon: Calendar },
  { title: "Settings", url: "/dashboard/landlord/settings", icon: Settings },
];

export const TENANT_MENU: MenuItem[] = [
  ...COMMON,
  //   { title: "My Rentals", url: "/tenant/rentals", icon: FileText },
  //   { title: "Inbox", url: "/tenant/inbox", icon: Inbox },
  //   { title: "Calendar", url: "/tenant/calendar", icon: Calendar },
  //   { title: "Settings", url: "/settings", icon: Settings },
];

export const ADMIN_MENU: MenuItem[] = [
  ...COMMON,
  //   { title: "User Management", url: "/admin/users", icon: Users },
  //   { title: "All Listings", url: "/admin/listings", icon: Building2 },
  //   { title: "Reports", url: "/admin/reports", icon: FileText },
  //   { title: "Settings", url: "/settings", icon: Settings },
];

export const GUEST_MENU: MenuItem[] = [
  ...COMMON,
  // add guest-only items if you want
];

export const ROLE_LABEL: Record<UserRole, string> = {
  landlord: "Landlord Panel",
  tenant: "Tenant Panel",
  admin: "Admin Panel",
};

export const ROLE_TO_MENU: Record<UserRole, MenuItem[]> = {
  landlord: LANDLORD_MENU,
  tenant: TENANT_MENU,
  admin: ADMIN_MENU,
};
