// types/menuItem.ts
import { Role } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export interface MenuItem {
	label: string;
	href: string;
	icon: LucideIcon;
	description?: string;
	badge?: number;
	role: Role[];
}
