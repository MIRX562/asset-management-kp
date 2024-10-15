// types/menuItem.ts
import { LucideIcon } from "lucide-react";

export interface MenuItem {
	label: string;
	href: string;
	icon: LucideIcon;
	description?: string;
	badge?: number;
}
