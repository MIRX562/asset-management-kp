"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

// Mock data for assets
const mockAssets = [
	{
		id: "1",
		name: 'MacBook Pro 16"',
		serialNumber: "MBP16-2023-001",
		status: "Available",
		lastCheckedOutBy: "John Doe",
	},
	{
		id: "2",
		name: "Dell XPS 15",
		serialNumber: "DXP15-2023-002",
		status: "Checked Out",
		lastCheckedOutBy: "Jane Smith",
	},
	{
		id: "3",
		name: "iPhone 13 Pro",
		serialNumber: "IP13P-2023-003",
		status: "Available",
		lastCheckedOutBy: "Mike Johnson",
	},
	{
		id: "4",
		name: "Tesla Model 3",
		serialNumber: "TM3-2023-004",
		status: "Checked Out",
		lastCheckedOutBy: "Emily Brown",
	},
	{
		id: "5",
		name: "HP LaserJet Pro",
		serialNumber: "HPLJ-2023-005",
		status: "Available",
		lastCheckedOutBy: "David Wilson",
	},
];

// Mock data for users
const mockUsers = [
	"John Doe",
	"Jane Smith",
	"Mike Johnson",
	"Emily Brown",
	"David Wilson",
];

export default function CheckInOutPage() {
	const [isCheckOut, setIsCheckOut] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState("");

	const filteredAssets = mockAssets.filter(
		(asset) =>
			(asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(isCheckOut
				? asset.status === "Available"
				: asset.status === "Checked Out")
	);

	const handleAssetSelection = (assetId: string) => {
		setSelectedAssets((prev) =>
			prev.includes(assetId)
				? prev.filter((id) => id !== assetId)
				: [...prev, assetId]
		);
	};

	const handleConfirm = () => {
		// Here you would typically make an API call to update the asset status
		toast({
			title: isCheckOut ? "Assets Checked Out" : "Assets Checked In",
			description: `Successfully ${isCheckOut ? "checked out" : "checked in"} ${
				selectedAssets.length
			} asset(s).`,
		});
		setSelectedAssets([]);
		setIsDialogOpen(false);
		setSelectedUser("");
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">
					Asset {isCheckOut ? "Check-Out" : "Check-In"}
				</h1>
				<div className="flex items-center space-x-2">
					<Label htmlFor="check-in-out-toggle">Check-In</Label>
					<Checkbox
						id="check-in-out-toggle"
						checked={isCheckOut}
						onCheckedChange={() => setIsCheckOut(!isCheckOut)}
					/>
					<Label htmlFor="check-in-out-toggle">Check-Out</Label>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<Input
					placeholder="Search assets..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="md:w-1/3"
				/>
				<Button
					onClick={() => setIsDialogOpen(true)}
					disabled={selectedAssets.length === 0}
				>
					{isCheckOut ? "Check-Out" : "Check-In"} Selected (
					{selectedAssets.length})
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">Select</TableHead>
						<TableHead>Asset Name</TableHead>
						<TableHead>Serial Number</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Last Checked Out By</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredAssets.map((asset) => (
						<TableRow key={asset.id}>
							<TableCell>
								<Checkbox
									checked={selectedAssets.includes(asset.id)}
									onCheckedChange={() => handleAssetSelection(asset.id)}
								/>
							</TableCell>
							<TableCell>{asset.name}</TableCell>
							<TableCell>{asset.serialNumber}</TableCell>
							<TableCell>
								{asset.status === "Available" ? (
									<span className="flex items-center text-green-600">
										<CheckCircle className="w-4 h-4 mr-1" /> Available
									</span>
								) : (
									<span className="flex items-center text-red-600">
										<XCircle className="w-4 h-4 mr-1" /> Checked Out
									</span>
								)}
							</TableCell>
							<TableCell>{asset.lastCheckedOutBy}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Confirm {isCheckOut ? "Check-Out" : "Check-In"}
						</DialogTitle>
						<DialogDescription>
							Are you sure you want to {isCheckOut ? "check out" : "check in"}{" "}
							the selected asset(s)?
						</DialogDescription>
					</DialogHeader>
					{isCheckOut && (
						<div className="mb-4">
							<Label htmlFor="user-select">Assign to User</Label>
							<Select value={selectedUser} onValueChange={setSelectedUser}>
								<SelectTrigger id="user-select">
									<SelectValue placeholder="Select a user" />
								</SelectTrigger>
								<SelectContent>
									{mockUsers.map((user) => (
										<SelectItem key={user} value={user}>
											{user}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={handleConfirm}
							disabled={isCheckOut && !selectedUser}
						>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
