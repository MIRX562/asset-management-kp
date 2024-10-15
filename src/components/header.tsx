"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarMobile from "./navigation/sidebar-mobile";
import { CircleUser } from "lucide-react";
import { Button } from "./ui/button";
import { NotificationPanelPop } from "./notification-panel";
import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
	"/": "Dashboard",
	"/assets": "Assets Management",
	"/maintenance": "Maintenance Management",
	"/inventory": "Inventory Management",
	"/reports": "Reports",
	"/users": "Admin/User Management",
	"/settings": "Settings",
	"/notifications": "Notifications",
	// Add more routes and titles as needed
};

const Header = () => {
	const path = usePathname();
	const [pageTitle, setPageTitle] = useState<string>(""); // State to hold the page title

	useEffect(() => {
		// Set the page title based on the current route
		const title = routeTitles[path]; // Default title if route not found
		setPageTitle(title);
		document.title = title; // Update the document title
	}, [path]);

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<SidebarMobile />
			<div className="w-full flex-1">
				<h1 className="font-bold text-2xl">{pageTitle}</h1>{" "}
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<CircleUser className="h-5 w-5" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<NotificationPanelPop />
		</header>
	);
};

export default Header;
