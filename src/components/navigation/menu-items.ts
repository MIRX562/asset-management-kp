import { MenuItem } from "@/types/menuItems";
import {
	Bell,
	ClipboardList,
	Home,
	LineChart,
	Package,
	ShoppingCart,
	Users,
	Wrench,
} from "lucide-react";

export const menuItems: MenuItem[] = [
	{
		label: "Dashboard",
		href: "/",
		icon: Home,
		description: "Overview of key metrics, quick actions, and notifications.",
	},
	{
		label: "Assets",
		icon: Package,
		href: "/assets",
	},
	{
		label: "Check-in",
		icon: ClipboardList,
		href: "/assets",
	},
	{
		label: "Check-out",
		icon: ClipboardList,
		href: "/assets",
	},
	{
		label: "Maintenance",
		icon: Wrench,
		href: "/maintenance",
		description: "View scheduled maintenance, log maintenance records.",
	},
	{
		label: "Inventory",
		icon: ShoppingCart,
		href: "/inventory",
		description:
			"View and manage inventory, update stock levels, add new items.",
	},
	{
		label: "Reports",
		icon: LineChart,
		href: "/reports",
		description:
			"Generate and view reports on assets, usage, maintenance, etc.",
	},
	{
		label: "User Management",
		icon: Users,
		href: "/admin/users",
		description: "Manage users, roles, and permissions (admin only).",
	},
	{
		label: "Notifications",
		icon: Bell,
		href: "/notifications",
		description: "View and manage system notifications.",
	},
];
