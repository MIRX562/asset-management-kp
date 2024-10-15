"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export const description =
	"A simple login form with email and password. The submit button says 'Sign in'.";

export default function LoginForm() {
	const router = useRouter();
	return (
		<div className="w-full h-screen flex items-center justify-center bg-slate-300">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" required />
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						onClick={() => {
							router.push("/");
						}}
					>
						Sign in
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}