"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Edit, CheckCircle, AlertCircle, Wrench } from "lucide-react";

type AssetStatus = "Available" | "In Use" | "Maintenance";

interface Asset {
	id: string;
	name: string;
	status: AssetStatus;
	serialNumber: string;
	purchaseDate: string;
	purchaseCost: number;
	assignedUser: string;
	location: string;
	imageUrl: string;
}

interface CheckInOutRecord {
	id: string;
	date: string;
	action: "Check-In" | "Check-Out";
	user: string;
}

interface MaintenanceRecord {
	id: string;
	date: string;
	description: string;
	technician: string;
}

const mockAsset: Asset = {
	id: "1",
	name: 'MacBook Pro 16"',
	status: "Available",
	serialNumber: "MBP16-2023-001",
	purchaseDate: "2023-01-15",
	purchaseCost: 2499.99,
	assignedUser: "John Doe",
	location: "IT Department",
	imageUrl: "/placeholder.svg?height=300&width=300",
};

const mockCheckInOutHistory: CheckInOutRecord[] = [
	{ id: "1", date: "2023-05-01", action: "Check-Out", user: "John Doe" },
	{ id: "2", date: "2023-05-15", action: "Check-In", user: "John Doe" },
	{ id: "3", date: "2023-06-01", action: "Check-Out", user: "Jane Smith" },
	{ id: "4", date: "2023-06-15", action: "Check-In", user: "Jane Smith" },
];

const mockMaintenanceLog: MaintenanceRecord[] = [
	{
		id: "1",
		date: "2023-03-01",
		description: "Regular checkup and cleaning",
		technician: "Mike Tech",
	},
	{
		id: "2",
		date: "2023-07-01",
		description: "Software update and optimization",
		technician: "Sarah IT",
	},
];

export default function AssetDetailPage() {
	const [asset, setAsset] = useState<Asset>(mockAsset);
	const [editMode, setEditMode] = useState<Record<string, boolean>>({});

	const toggleEditMode = (field: string) => {
		setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleInputChange = (field: keyof Asset, value: string | number) => {
		setAsset((prev) => ({ ...prev, [field]: value }));
	};

	const renderEditableField = (field: keyof Asset, label: string) => (
		<div className="flex items-center justify-between">
			<Label htmlFor={field}>{label}</Label>
			{editMode[field] ? (
				<Input
					id={field}
					value={asset[field]}
					onChange={(e) => handleInputChange(field, e.target.value)}
					className="w-1/2"
				/>
			) : (
				<span>{asset[field]}</span>
			)}
			<Button variant="ghost" size="icon" onClick={() => toggleEditMode(field)}>
				<Edit className="h-4 w-4" />
				<span className="sr-only">Edit {label}</span>
			</Button>
		</div>
	);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">{asset.name}</h1>
				<div className="flex items-center space-x-2">
					{asset.status === "Available" && (
						<CheckCircle className="text-green-500" />
					)}
					{asset.status === "In Use" && (
						<AlertCircle className="text-yellow-500" />
					)}
					{asset.status === "Maintenance" && (
						<Wrench className="text-red-500" />
					)}
					<span>{asset.status}</span>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
				<Card>
					<CardHeader>
						<CardTitle>Asset Image</CardTitle>
					</CardHeader>
					<CardContent>
						<Image
							src={asset.imageUrl}
							alt={asset.name}
							width={300}
							height={300}
							className="rounded-lg"
						/>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Asset Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{renderEditableField("serialNumber", "Serial Number")}
						{renderEditableField("purchaseDate", "Purchase Date")}
						{renderEditableField("purchaseCost", "Purchase Cost")}
						{renderEditableField("assignedUser", "Assigned User")}
						{renderEditableField("location", "Location")}
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="overview" className="mb-6">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="history">Check-In/Out History</TabsTrigger>
					<TabsTrigger value="maintenance">Maintenance Log</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<Card>
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								This is a {asset.name} with serial number {asset.serialNumber}.
								It was purchased on {asset.purchaseDate} for $
								{asset.purchaseCost}. Currently, it is{" "}
								{asset.status.toLowerCase()} and assigned to{" "}
								{asset.assignedUser} in the {asset.location}.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="history">
					<Card>
						<CardHeader>
							<CardTitle>Check-In/Out History</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Date</TableHead>
										<TableHead>Action</TableHead>
										<TableHead>User</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{mockCheckInOutHistory.map((record) => (
										<TableRow key={record.id}>
											<TableCell>{record.date}</TableCell>
											<TableCell>{record.action}</TableCell>
											<TableCell>{record.user}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="maintenance">
					<Card>
						<CardHeader>
							<CardTitle>Maintenance Log</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Date</TableHead>
										<TableHead>Description</TableHead>
										<TableHead>Technician</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{mockMaintenanceLog.map((record) => (
										<TableRow key={record.id}>
											<TableCell>{record.date}</TableCell>
											<TableCell>{record.description}</TableCell>
											<TableCell>{record.technician}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<div className="flex justify-end space-x-4">
				<Button variant="outline">Edit Asset</Button>
				<Button variant="outline">
					{asset.status === "Available" ? "Check-Out" : "Check-In"}
				</Button>
				<Button variant="outline">Schedule Maintenance</Button>
			</div>
		</div>
	);
}
