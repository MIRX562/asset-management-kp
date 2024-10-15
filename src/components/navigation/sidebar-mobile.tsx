"use client";
import { Bell, Menu, Package2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { menuItems } from "@/components/navigation/sidebar"; // Import shared menuItems
import { usePathname } from "next/navigation";

const SidebarMobile = () => {
	const currentPath = usePathname(); // Get the current pathname

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col w-1/2 rounded-r-md">
				<nav className="grid gap-2 text-lg font-medium">
					<Link
						href="#"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<Package2 className="h-6 w-6" />
						<span className="sr-only">Acme Inc</span>
					</Link>

					{menuItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
								currentPath === item.href
									? "bg-muted text-primary"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<item.icon className="h-5 w-5" />
							{item.label}
							{item.badge && (
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									{item.badge}
								</Badge>
							)}
						</Link>
					))}
					<Link
						href="/notifications"
						className={`flex items-center gap-3 rounded-lg py-2 transition-all ${
							currentPath === "/notifications"
								? "bg-muted text-primary"
								: "text-muted-foreground hover:text-primary"
						}`}
					>
						<Bell className="h-4 w-4" />
						Notifications
					</Link>
					<Link
						href="/settings"
						className={`flex items-center gap-3 rounded-lg py-2 transition-all ${
							currentPath === "/settings"
								? "bg-muted text-primary"
								: "text-muted-foreground hover:text-primary"
						}`}
					>
						<Settings className="h-4 w-4" />
						Settings
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default SidebarMobile;
