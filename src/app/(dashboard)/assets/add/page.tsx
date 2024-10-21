"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Asset name must be at least 2 characters.",
	}),
	category: z.string({
		required_error: "Please select a category.",
	}),
	serialNumber: z.string().min(2, {
		message: "Serial number must be at least 2 characters.",
	}),
	purchaseDate: z.date({
		required_error: "A purchase date is required.",
	}),
	purchaseCost: z.coerce.number().positive({
		message: "Purchase cost must be a positive number.",
	}),
	status: z.enum(["Available", "In Use", "Maintenance"], {
		required_error: "Please select a status.",
	}),
	location: z.string().min(2, {
		message: "Location must be at least 2 characters.",
	}),
	assignedUser: z.string().optional(),
});

const mockCategories = [
	"Laptop",
	"Desktop",
	"Monitor",
	"Printer",
	"Smartphone",
	"Tablet",
	"Server",
	"Networking Equipment",
	"Other",
];

const mockUsers = [
	"John Doe",
	"Jane Smith",
	"Mike Johnson",
	"Emily Brown",
	"Unassigned",
];

export default function AddEditAssetPage({ assetId }: { assetId?: string }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			category: "",
			serialNumber: "",
			purchaseDate: new Date(),
			purchaseCost: 0,
			status: "Available",
			location: "",
			assignedUser: "Unassigned",
		},
	});

	useEffect(() => {
		if (assetId) {
			// Fetch asset data and populate form
			// This is a mock fetch, replace with actual API call
			setIsLoading(true);
			setTimeout(() => {
				form.reset({
					name: 'MacBook Pro 16"',
					category: "Laptop",
					serialNumber: "MBP16-2023-001",
					purchaseDate: new Date("2023-01-15"),
					purchaseCost: 2499.99,
					status: "Available",
					location: "IT Department",
					assignedUser: "John Doe",
				});
				setImagePreview("/placeholder.svg?height=300&width=300");
				setIsLoading(false);
			}, 1000);
		}
	}, [assetId, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		// This is where you would typically make an API call to save the asset
		console.log(values);
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: assetId ? "Asset Updated" : "Asset Created",
				description: "The asset has been successfully saved.",
			});
			router.push("/assets"); // Redirect to asset list page
		}, 1000);
	}

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">
				{assetId ? "Edit Asset" : "Add New Asset"}
			</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Asset Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter asset name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{mockCategories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serialNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Serial Number</FormLabel>
									<FormControl>
										<Input placeholder="Enter serial number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="purchaseDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Purchase Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="purchaseCost"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Purchase Cost</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											placeholder="Enter purchase cost"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Available">Available</SelectItem>
											<SelectItem value="In Use">In Use</SelectItem>
											<SelectItem value="Maintenance">Maintenance</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input placeholder="Enter location" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="assignedUser"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Assigned User</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a user" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{mockUsers.map((user) => (
												<SelectItem key={user} value={user}>
													{user}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormItem>
						<FormLabel>Asset Image</FormLabel>
						<FormControl>
							<Input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
							/>
						</FormControl>
						<FormDescription>
							Upload an image of the asset (optional)
						</FormDescription>
						{imagePreview && (
							<Image
								src={imagePreview}
								alt="Asset preview"
								width={300}
								height={300}
								className="mt-2 rounded-lg"
							/>
						)}
					</FormItem>
					<div className="flex justify-end space-x-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.back()}
						>
							Cancel
						</Button>
						<Button type="submit">Save Asset</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
