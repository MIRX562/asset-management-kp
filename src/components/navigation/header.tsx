"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import SidebarMobile from "./sidebar-mobile";
import { usePathname } from "next/navigation";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "../theme-toggle";
import NotificationTray from "../notification-tray";

const routeTitles: Record<string, string> = {
	"/": "Dashboard",
	"/assets": "Assets Management",
	"/maintenance": "Maintenance Management",
	"/inventory": "Inventory Management",
	"/reports": "Reports",
	"/users": "User Management",
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
			<UserNav />
			<ThemeToggle />
			<NotificationTray />
		</header>
	);
};

export default Header;
