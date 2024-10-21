"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Edit, Trash2, Eye } from "lucide-react";

// Mock data for assets
const mockAssets = [
	{
		id: "1",
		name: 'MacBook Pro 16"',
		serialNumber: "MBP16-2023-001",
		category: "Computers",
		status: "Available",
		lastCheckedOutBy: "John Doe",
	},
	{
		id: "2",
		name: "Dell XPS 15",
		serialNumber: "DXP15-2023-002",
		category: "Computers",
		status: "In Use",
		lastCheckedOutBy: "Jane Smith",
	},
	{
		id: "3",
		name: "iPhone 13 Pro",
		serialNumber: "IP13P-2023-003",
		category: "Mobile Devices",
		status: "Maintenance",
		lastCheckedOutBy: "Mike Johnson",
	},
	{
		id: "4",
		name: "Tesla Model 3",
		serialNumber: "TM3-2023-004",
		category: "Vehicles",
		status: "Available",
		lastCheckedOutBy: "Emily Brown",
	},
	{
		id: "5",
		name: "HP LaserJet Pro",
		serialNumber: "HPLJ-2023-005",
		category: "Printers",
		status: "In Use",
		lastCheckedOutBy: "David Wilson",
	},
];

// Mock data for charts
const statusData = [
	{ name: "Available", value: 45 },
	{ name: "In Use", value: 30 },
	{ name: "Maintenance", value: 25 },
];

const categoryData = [
	{ name: "Computers", count: 50 },
	{ name: "Mobile Devices", count: 30 },
	{ name: "Vehicles", count: 10 },
	{ name: "Printers", count: 15 },
	{ name: "Other", count: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AssetsPage() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [categoryFilter, setCategoryFilter] = useState("All");

	const filteredAssets = mockAssets.filter(
		(asset) =>
			(asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
				asset.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(statusFilter === "All" || asset.status === statusFilter) &&
			(categoryFilter === "All" || asset.category === categoryFilter)
	);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Assets</h1>
				<Button onClick={() => router.push("/assets/add")}>Add Asset</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<Card>
					<CardHeader>
						<CardTitle>Asset Status Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={{}} className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={statusData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label={({ name, percent }) =>
											`${name} ${(percent * 100).toFixed(0)}%`
										}
									>
										{statusData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<ChartTooltip content={<ChartTooltipContent />} />
								</PieChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Assets by Category</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={{}} className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={categoryData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar dataKey="count" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<Input
					placeholder="Search assets..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="md:w-1/3"
				/>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="md:w-1/4">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Statuses</SelectItem>
						<SelectItem value="Available">Available</SelectItem>
						<SelectItem value="In Use">In Use</SelectItem>
						<SelectItem value="Maintenance">Maintenance</SelectItem>
					</SelectContent>
				</Select>
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="md:w-1/4">
						<SelectValue placeholder="Filter by category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Categories</SelectItem>
						<SelectItem value="Computers">Computers</SelectItem>
						<SelectItem value="Mobile Devices">Mobile Devices</SelectItem>
						<SelectItem value="Vehicles">Vehicles</SelectItem>
						<SelectItem value="Printers">Printers</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Asset List</CardTitle>
					<CardDescription>
						Showing {filteredAssets.length} of {mockAssets.length} assets
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Asset Name</TableHead>
								<TableHead>Serial Number</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Last Checked Out By</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAssets.map((asset) => (
								<TableRow key={asset.id}>
									<TableCell>{asset.name}</TableCell>
									<TableCell>{asset.serialNumber}</TableCell>
									<TableCell>{asset.category}</TableCell>
									<TableCell>{asset.status}</TableCell>
									<TableCell>{asset.lastCheckedOutBy}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" asChild>
												<Link href={`/assets/${asset.id}`}>
													<Eye className="h-4 w-4" />
													<span className="sr-only">View Details</span>
												</Link>
											</Button>
											<Button variant="ghost" size="icon" asChild>
												<Link href={`/assets/${asset.id}/edit`}>
													<Edit className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Link>
											</Button>
											<Button variant="ghost" size="icon">
												<Trash2 className="h-4 w-4" />
												<span className="sr-only">Delete</span>
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
