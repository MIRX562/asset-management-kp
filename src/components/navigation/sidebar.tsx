"use client";
import Link from "next/link";
import {
	Bell,
	ClipboardList,
	Home,
	LineChart,
	Package,
	Package2,
	Settings,
	ShoppingCart,
	Users,
	Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/menuItems";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

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
		label: "Users",
		icon: Users,
		href: "/users",
		description: "Manage users, roles, and permissions (admin only).",
	},
];

const Sidebar = () => {
	const currentPath = usePathname(); // Get the current pathname

	return (
		<div className="flex h-full max-h-screen flex-col gap-2">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Link href="/" className="flex items-center gap-2 font-semibold">
					<Package2 className="h-6 w-6" />
					<span className="">As Mage</span>
				</Link>
			</div>
			<div className="flex-1">
				<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
					{menuItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
								currentPath === item.href
									? "bg-muted text-primary"
									: "text-muted-foreground hover:text-primary"
							}`}
						>
							<item.icon className="h-4 w-4" />
							{item.label}
							{item.badge && (
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									{item.badge}
								</Badge>
							)}
						</Link>
					))}
				</nav>
			</div>
			<div className="mt-auto p-4">
				<Separator />
				<Link
					href="/notifications"
					className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
						currentPath === "/notification"
							? "bg-muted text-primary"
							: "text-muted-foreground hover:text-primary"
					}`}
				>
					<Bell className="h-4 w-4" />
					Notifications
				</Link>
				<Link
					href="/settings"
					className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
						currentPath === "/settings"
							? "bg-muted text-primary"
							: "text-muted-foreground hover:text-primary"
					}`}
				>
					<Settings className="h-4 w-4" />
					Settings
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
