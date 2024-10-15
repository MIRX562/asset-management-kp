"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme(); // Access current theme

	const toggleTheme = () => {
		// Toggle between light and dark themes
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
	};

	return (
		<Button variant="outline" size="icon" onClick={toggleTheme}>
			<Sun
				className={`h-[1.2rem] w-[1.2rem] transition-all ${
					theme === "dark" ? "rotate-0 scale-0" : "rotate-90 scale-100"
				}`}
			/>
			<Moon
				className={`h-[1.2rem] w-[1.2rem] transition-all ${
					theme === "dark" ? "rotate-90 scale-100" : "rotate-0 scale-0"
				}`}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
