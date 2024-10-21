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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { CalendarIcon, FileDown, RefreshCw } from "lucide-react";

// Mock data for reports
const mockAssetUsageReport = [
	{
		id: "1",
		assetName: "Laptop XYZ",
		serialNumber: "LPT-001",
		checkOutDate: "2023-06-01",
		checkInDate: "2023-06-15",
		user: "John Doe",
	},
	{
		id: "2",
		assetName: "Projector ABC",
		serialNumber: "PRJ-002",
		checkOutDate: "2023-06-05",
		checkInDate: "2023-06-10",
		user: "Jane Smith",
	},
	{
		id: "3",
		assetName: "Tablet 123",
		serialNumber: "TBL-003",
		checkOutDate: "2023-06-08",
		checkInDate: null,
		user: "Mike Johnson",
	},
];

const mockMaintenanceReport = [
	{
		id: "1",
		assetName: "Printer XYZ",
		serialNumber: "PRT-001",
		maintenanceDate: "2023-05-15",
		type: "Regular",
		cost: "$150",
		technician: "Tech A",
	},
	{
		id: "2",
		assetName: "Server ABC",
		serialNumber: "SRV-002",
		maintenanceDate: "2023-06-01",
		type: "Emergency",
		cost: "$500",
		technician: "Tech B",
	},
	{
		id: "3",
		assetName: "HVAC System",
		serialNumber: "HVAC-003",
		maintenanceDate: "2023-06-10",
		type: "Scheduled",
		cost: "$300",
		technician: "Tech C",
	},
];

const mockInventoryReport = [
	{
		id: "1",
		itemName: "Ink Cartridge",
		category: "Office Supplies",
		initialStock: 100,
		consumed: 75,
		remaining: 25,
	},
	{
		id: "2",
		itemName: "A4 Paper",
		category: "Office Supplies",
		initialStock: 5000,
		consumed: 3000,
		remaining: 2000,
	},
	{
		id: "3",
		itemName: "Ethernet Cable",
		category: "IT Supplies",
		initialStock: 50,
		consumed: 30,
		remaining: 20,
	},
];

const categories = [
	"All",
	"Electronics",
	"Furniture",
	"Office Supplies",
	"IT Supplies",
];

export default function ReportPage() {
	const [activeTab, setActiveTab] = useState("assetUsage");
	const [dateRange, setDateRange] = useState({
		from: subDays(new Date(), 30),
		to: new Date(),
	});
	const [category, setCategory] = useState("All");
	const [reportData, setReportData] = useState(mockAssetUsageReport);

	const handleGenerateReport = () => {
		// In a real application, this would fetch data from an API based on the selected filters
		let newData;
		switch (activeTab) {
			case "assetUsage":
				newData = mockAssetUsageReport;
				break;
			case "maintenance":
				newData = mockMaintenanceReport;
				break;
			case "inventory":
				newData = mockInventoryReport;
				break;
			default:
				newData = [];
		}
		setReportData(newData);
	};

	const handleExport = (format) => {
		// In a real application, this would generate and download the report in the specified format
		console.log(`Exporting ${activeTab} report in ${format} format`);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Reports</h1>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="assetUsage">Asset Usage Report</TabsTrigger>
					<TabsTrigger value="maintenance">Maintenance Report</TabsTrigger>
					<TabsTrigger value="inventory">Inventory Report</TabsTrigger>
				</TabsList>
			</Tabs>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Report Filters</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<Label htmlFor="dateRange" className="mb-2 block">
								Date Range
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										id="dateRange"
										variant={"outline"}
										className={cn(
											"w-full justify-start text-left font-normal",
											!dateRange && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{dateRange?.from ? (
											dateRange.to ? (
												<>
													{format(dateRange.from, "LLL dd, y")} -{" "}
													{format(dateRange.to, "LLL dd, y")}
												</>
											) : (
												format(dateRange.from, "LLL dd, y")
											)
										) : (
											<span>Pick a date range</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										initialFocus
										mode="range"
										defaultMonth={dateRange?.from}
										selected={dateRange}
										onSelect={setDateRange}
										numberOfMonths={2}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="flex-1">
							<Label htmlFor="category" className="mb-2 block">
								Category
							</Label>
							<Select value={category} onValueChange={setCategory}>
								<SelectTrigger id="category">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((cat) => (
										<SelectItem key={cat} value={cat}>
											{cat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-between mb-6">
				<Button onClick={handleGenerateReport}>
					<RefreshCw className="mr-2 h-4 w-4" />
					Generate Report
				</Button>
				<div className="space-x-2">
					<Button variant="outline" onClick={() => handleExport("pdf")}>
						<FileDown className="mr-2 h-4 w-4" />
						Export to PDF
					</Button>
					<Button variant="outline" onClick={() => handleExport("csv")}>
						<FileDown className="mr-2 h-4 w-4" />
						Export to CSV
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>
						{activeTab === "assetUsage"
							? "Asset Usage Report"
							: activeTab === "maintenance"
							? "Maintenance Report"
							: "Inventory Report"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								{activeTab === "assetUsage" && (
									<>
										<TableHead>Asset Name</TableHead>
										<TableHead>Serial Number</TableHead>
										<TableHead>Check Out Date</TableHead>
										<TableHead>Check In Date</TableHead>
										<TableHead>User</TableHead>
									</>
								)}
								{activeTab === "maintenance" && (
									<>
										<TableHead>Asset Name</TableHead>
										<TableHead>Serial Number</TableHead>
										<TableHead>Maintenance Date</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Cost</TableHead>
										<TableHead>Technician</TableHead>
									</>
								)}
								{activeTab === "inventory" && (
									<>
										<TableHead>Item Name</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Initial Stock</TableHead>
										<TableHead>Consumed</TableHead>
										<TableHead>Remaining</TableHead>
									</>
								)}
							</TableRow>
						</TableHeader>
						<TableBody>
							{reportData.map((item) => (
								<TableRow key={item.id}>
									{activeTab === "assetUsage" && (
										<>
											<TableCell>{item.assetName}</TableCell>
											<TableCell>{item.serialNumber}</TableCell>
											<TableCell>{item.checkOutDate}</TableCell>
											<TableCell>
												{item.checkInDate || "Not returned"}
											</TableCell>
											<TableCell>{item.user}</TableCell>
										</>
									)}
									{activeTab === "maintenance" && (
										<>
											<TableCell>{item.assetName}</TableCell>
											<TableCell>{item.serialNumber}</TableCell>
											<TableCell>{item.maintenanceDate}</TableCell>
											<TableCell>{item.type}</TableCell>
											<TableCell>{item.cost}</TableCell>
											<TableCell>{item.technician}</TableCell>
										</>
									)}
									{activeTab === "inventory" && (
										<>
											<TableCell>{item.itemName}</TableCell>
											<TableCell>{item.category}</TableCell>
											<TableCell>{item.initialStock}</TableCell>
											<TableCell>{item.consumed}</TableCell>
											<TableCell>{item.remaining}</TableCell>
										</>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
