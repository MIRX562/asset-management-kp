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
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Edit, PlusCircle } from "lucide-react";

// Mock data for maintenance records
const mockMaintenanceRecords = [
	{
		id: "1",
		assetName: "Printer XYZ",
		serialNumber: "PRT-001",
		lastServiceDate: "2023-05-15",
		nextDueDate: "2023-11-15",
		description: "Regular checkup and cleaning",
	},
	{
		id: "2",
		assetName: "Laptop ABC",
		serialNumber: "LPT-002",
		lastServiceDate: "2023-06-01",
		nextDueDate: "2023-12-01",
		description: "Software update and hardware inspection",
	},
	{
		id: "3",
		assetName: "Server 001",
		serialNumber: "SRV-003",
		lastServiceDate: "2023-04-30",
		nextDueDate: "2023-07-30",
		description: "Cooling system maintenance",
	},
	{
		id: "4",
		assetName: "Office Chair",
		serialNumber: "CHR-004",
		lastServiceDate: "2023-03-15",
		nextDueDate: "2024-03-15",
		description: "Annual inspection",
	},
	{
		id: "5",
		assetName: "HVAC System",
		serialNumber: "HVAC-005",
		lastServiceDate: "2023-01-01",
		nextDueDate: "2023-07-01",
		description: "Bi-annual servicing",
	},
];

export default function MaintenancePage() {
	const [maintenanceRecords, setMaintenanceRecords] = useState(
		mockMaintenanceRecords
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLogMaintenanceOpen, setIsLogMaintenanceOpen] = useState(false);
	const [editRecord, setEditRecord] = useState(null);
	const [newRecord, setNewRecord] = useState({
		assetName: "",
		serialNumber: "",
		lastServiceDate: new Date(),
		nextDueDate: new Date(),
		description: "",
	});

	const filteredRecords = maintenanceRecords.filter(
		(record) =>
			record.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			record.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			record.lastServiceDate.includes(searchTerm) ||
			record.nextDueDate.includes(searchTerm)
	);

	const handleLogMaintenance = () => {
		const id = (
			parseInt(maintenanceRecords[maintenanceRecords.length - 1].id) + 1
		).toString();
		setMaintenanceRecords([
			...maintenanceRecords,
			{
				...newRecord,
				id,
				lastServiceDate: format(newRecord.lastServiceDate, "yyyy-MM-dd"),
				nextDueDate: format(newRecord.nextDueDate, "yyyy-MM-dd"),
			},
		]);
		setNewRecord({
			assetName: "",
			serialNumber: "",
			lastServiceDate: new Date(),
			nextDueDate: new Date(),
			description: "",
		});
		setIsLogMaintenanceOpen(false);
	};

	const handleEditMaintenance = () => {
		setMaintenanceRecords(
			maintenanceRecords.map((record) =>
				record.id === editRecord.id
					? {
							...editRecord,
							lastServiceDate: format(
								new Date(editRecord.lastServiceDate),
								"yyyy-MM-dd"
							),
							nextDueDate: format(
								new Date(editRecord.nextDueDate),
								"yyyy-MM-dd"
							),
					  }
					: record
			)
		);
		setEditRecord(null);
	};

	const isOverdue = (dueDate) => {
		return new Date(dueDate) < new Date();
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Maintenance Schedule</h1>
				<Dialog
					open={isLogMaintenanceOpen}
					onOpenChange={setIsLogMaintenanceOpen}
				>
					<DialogTrigger asChild>
						<Button>
							<PlusCircle className="mr-2 h-4 w-4" />
							Log Maintenance
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Log Maintenance</DialogTitle>
							<DialogDescription>
								Enter the details of the maintenance activity.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="assetName" className="text-right">
									Asset Name
								</Label>
								<Input
									id="assetName"
									value={newRecord.assetName}
									onChange={(e) =>
										setNewRecord({ ...newRecord, assetName: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="serialNumber" className="text-right">
									Serial Number
								</Label>
								<Input
									id="serialNumber"
									value={newRecord.serialNumber}
									onChange={(e) =>
										setNewRecord({ ...newRecord, serialNumber: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="lastServiceDate" className="text-right">
									Last Service Date
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!newRecord.lastServiceDate && "text-muted-foreground"
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{newRecord.lastServiceDate ? (
												format(newRecord.lastServiceDate, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={newRecord.lastServiceDate}
											onSelect={(date) =>
												setNewRecord({ ...newRecord, lastServiceDate: date })
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="nextDueDate" className="text-right">
									Next Due Date
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!newRecord.nextDueDate && "text-muted-foreground"
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{newRecord.nextDueDate ? (
												format(newRecord.nextDueDate, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={newRecord.nextDueDate}
											onSelect={(date) =>
												setNewRecord({ ...newRecord, nextDueDate: date })
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Input
									id="description"
									value={newRecord.description}
									onChange={(e) =>
										setNewRecord({ ...newRecord, description: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button onClick={handleLogMaintenance}>Log Maintenance</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Search Maintenance Records</CardTitle>
				</CardHeader>
				<CardContent>
					<Input
						placeholder="Search by asset name, serial number, or maintenance date..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Maintenance Records</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Asset Name</TableHead>
								<TableHead>Serial Number</TableHead>
								<TableHead>Last Service Date</TableHead>
								<TableHead>Next Due Date</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredRecords.map((record) => (
								<TableRow
									key={record.id}
									className={isOverdue(record.nextDueDate) ? "bg-red-100" : ""}
								>
									<TableCell>{record.assetName}</TableCell>
									<TableCell>{record.serialNumber}</TableCell>
									<TableCell>{record.lastServiceDate}</TableCell>
									<TableCell>{record.nextDueDate}</TableCell>
									<TableCell>{record.description}</TableCell>
									<TableCell>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => setEditRecord(record)}
												>
													<Edit className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Button>
											</DialogTrigger>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>Edit Maintenance Record</DialogTitle>
													<DialogDescription>
														Update the details of the maintenance record.
													</DialogDescription>
												</DialogHeader>
												{editRecord && (
													<div className="grid gap-4 py-4">
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-assetName"
																className="text-right"
															>
																Asset Name
															</Label>
															<Input
																id="edit-assetName"
																value={editRecord.assetName}
																onChange={(e) =>
																	setEditRecord({
																		...editRecord,
																		assetName: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-serialNumber"
																className="text-right"
															>
																Serial Number
															</Label>
															<Input
																id="edit-serialNumber"
																value={editRecord.serialNumber}
																onChange={(e) =>
																	setEditRecord({
																		...editRecord,
																		serialNumber: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-lastServiceDate"
																className="text-right"
															>
																Last Service Date
															</Label>
															<Popover>
																<PopoverTrigger asChild>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"w-[280px] justify-start text-left font-normal",
																			!editRecord.lastServiceDate &&
																				"text-muted-foreground"
																		)}
																	>
																		<CalendarIcon className="mr-2 h-4 w-4" />
																		{editRecord.lastServiceDate ? (
																			format(
																				new Date(editRecord.lastServiceDate),
																				"PPP"
																			)
																		) : (
																			<span>Pick a date</span>
																		)}
																	</Button>
																</PopoverTrigger>
																<PopoverContent className="w-auto p-0">
																	<Calendar
																		mode="single"
																		selected={
																			new Date(editRecord.lastServiceDate)
																		}
																		onSelect={(date) =>
																			setEditRecord({
																				...editRecord,
																				lastServiceDate: format(
																					date,
																					"yyyy-MM-dd"
																				),
																			})
																		}
																		initialFocus
																	/>
																</PopoverContent>
															</Popover>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-nextDueDate"
																className="text-right"
															>
																Next Due Date
															</Label>
															<Popover>
																<PopoverTrigger asChild>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"w-[280px] justify-start text-left font-normal",
																			!editRecord.nextDueDate &&
																				"text-muted-foreground"
																		)}
																	>
																		<CalendarIcon className="mr-2 h-4 w-4" />
																		{editRecord.nextDueDate ? (
																			format(
																				new Date(editRecord.nextDueDate),
																				"PPP"
																			)
																		) : (
																			<span>Pick a date</span>
																		)}
																	</Button>
																</PopoverTrigger>
																<PopoverContent className="w-auto p-0">
																	<Calendar
																		mode="single"
																		selected={new Date(editRecord.nextDueDate)}
																		onSelect={(date) =>
																			setEditRecord({
																				...editRecord,
																				nextDueDate: format(date, "yyyy-MM-dd"),
																			})
																		}
																		initialFocus
																	/>
																</PopoverContent>
															</Popover>
														</div>

														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-description"
																className="text-right"
															>
																Description
															</Label>
															<Input
																id="edit-description"
																value={editRecord.description}
																onChange={(e) =>
																	setEditRecord({
																		...editRecord,
																		description: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
													</div>
												)}
												<DialogFooter>
													<Button onClick={handleEditMaintenance}>
														Update Record
													</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
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
