"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter for client-side navigation
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./form";

export default function LoginPage() {
	const router = useRouter();

	useEffect(() => {
		const checkUserExists = async () => {
			try {
				const response = await fetch("/api/users/check");
				if (!response.ok) {
					throw new Error("Failed to fetch user status");
				}
				const data = await response.json();
				console.log("API response:", data); // Log the response data for debugging

				// If no users exist, redirect to onboarding page
				if (!data.exists) {
					console.log("Redirecting to onboarding"); // Log redirection action
					router.replace("/login/onboarding");
				}
			} catch (error) {
				console.error("Failed to check user existence:", error);
			}
		};

		checkUserExists();
	}, [router]);

	// Render the login page if users exist
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
