"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// !Step 1: Create a Zod schema for the form
const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string(),
});

// Step 2: Boilerplate Form Component
export function LoginForm() {
	const router = useRouter();
	// !Step 3: Initialize react-hook-form with Zod validation
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// !Step 4: Define the submit handler
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const { error } = await signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onError: (ctx) => {
					alert(ctx.error.message);
				},
			}
		);

		if (!error) {
			// console.log(data);
			router.push("/");
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter strong password"
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Submit Button */}
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
}
