"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { Edit, PlusCircle } from "lucide-react";

// Mock data for inventory items
const mockInventoryItems = [
	{
		id: "1",
		name: "Laptop",
		category: "Electronics",
		quantity: 50,
		lowStockThreshold: 10,
	},
	{
		id: "2",
		name: "Desk Chair",
		category: "Furniture",
		quantity: 30,
		lowStockThreshold: 5,
	},
	{
		id: "3",
		name: "Printer",
		category: "Electronics",
		quantity: 15,
		lowStockThreshold: 3,
	},
	{
		id: "4",
		name: "Whiteboard",
		category: "Office Supplies",
		quantity: 20,
		lowStockThreshold: 5,
	},
	{
		id: "5",
		name: "Notebook",
		category: "Office Supplies",
		quantity: 100,
		lowStockThreshold: 20,
	},
];

const categories = ["All", "Electronics", "Furniture", "Office Supplies"];

export default function InventoryListPage() {
	const [inventoryItems, setInventoryItems] = useState(mockInventoryItems);
	const [searchTerm, setSearchTerm] = useState("");
	const [showLowStock, setShowLowStock] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [editItem, setEditItem] = useState(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newItem, setNewItem] = useState({
		name: "",
		category: "",
		quantity: 0,
		lowStockThreshold: 0,
	});

	const filteredItems = inventoryItems.filter(
		(item) =>
			(item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(!showLowStock || item.quantity <= item.lowStockThreshold) &&
			(selectedCategory === "All" || item.category === selectedCategory)
	);

	const handleEditItem = () => {
		setInventoryItems(
			inventoryItems.map((item) => (item.id === editItem.id ? editItem : item))
		);
		setEditItem(null);
	};

	const handleAddItem = () => {
		const id = (
			parseInt(inventoryItems[inventoryItems.length - 1].id) + 1
		).toString();
		setInventoryItems([...inventoryItems, { ...newItem, id }]);
		setNewItem({ name: "", category: "", quantity: 0, lowStockThreshold: 0 });
		setIsAddDialogOpen(false);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Inventory List</h1>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Inventory Item
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Inventory Item</DialogTitle>
							<DialogDescription>
								Enter the details of the new inventory item.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									value={newItem.name}
									onChange={(e) =>
										setNewItem({ ...newItem, name: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="category" className="text-right">
									Category
								</Label>
								<Select
									value={newItem.category}
									onValueChange={(value) =>
										setNewItem({ ...newItem, category: value })
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										{categories
											.filter((cat) => cat !== "All")
											.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="quantity" className="text-right">
									Quantity
								</Label>
								<Input
									id="quantity"
									type="number"
									value={newItem.quantity}
									onChange={(e) =>
										setNewItem({
											...newItem,
											quantity: parseInt(e.target.value),
										})
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="lowStockThreshold" className="text-right">
									Low Stock Threshold
								</Label>
								<Input
									id="lowStockThreshold"
									type="number"
									value={newItem.lowStockThreshold}
									onChange={(e) =>
										setNewItem({
											...newItem,
											lowStockThreshold: parseInt(e.target.value),
										})
									}
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button onClick={handleAddItem}>Add Item</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Search and Filter</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-4">
						<Input
							placeholder="Search items..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="md:w-1/3"
						/>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="lowStock"
								checked={showLowStock}
								onCheckedChange={setShowLowStock}
							/>
							<label
								htmlFor="lowStock"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Show Low Stock Only
							</label>
						</div>
						<Select
							value={selectedCategory}
							onValueChange={setSelectedCategory}
						>
							<SelectTrigger className="md:w-1/4">
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Inventory Items</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Item Name</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Low Stock Threshold</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredItems.map((item) => (
								<TableRow
									key={item.id}
									className={
										item.quantity <= item.lowStockThreshold ? "bg-red-100" : ""
									}
								>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.category}</TableCell>
									<TableCell>{item.quantity}</TableCell>
									<TableCell>{item.lowStockThreshold}</TableCell>
									<TableCell>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => setEditItem(item)}
												>
													<Edit className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Edit Inventory Item</DialogTitle>
													<DialogDescription>
														Update the details of the inventory item.
													</DialogDescription>
												</DialogHeader>
												{editItem && (
													<div className="grid gap-4 py-4">
														<div className="grid grid-cols-4 items-center gap-4">
															<Label htmlFor="edit-name" className="text-right">
																Name
															</Label>
															<Input
																id="edit-name"
																value={editItem.name}
																onChange={(e) =>
																	setEditItem({
																		...editItem,
																		name: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-category"
																className="text-right"
															>
																Category
															</Label>
															<Select
																value={editItem.category}
																onValueChange={(value) =>
																	setEditItem({ ...editItem, category: value })
																}
															>
																<SelectTrigger className="col-span-3">
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	{categories
																		.filter((cat) => cat !== "All")
																		.map((category) => (
																			<SelectItem
																				key={category}
																				value={category}
																			>
																				{category}
																			</SelectItem>
																		))}
																</SelectContent>
															</Select>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-quantity"
																className="text-right"
															>
																Quantity
															</Label>
															<Input
																id="edit-quantity"
																type="number"
																value={editItem.quantity}
																onChange={(e) =>
																	setEditItem({
																		...editItem,
																		quantity: parseInt(e.target.value),
																	})
																}
																className="col-span-3"
															/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label
																htmlFor="edit-lowStockThreshold"
																className="text-right"
															>
																Low Stock Threshold
															</Label>
															<Input
																id="edit-lowStockThreshold"
																type="number"
																value={editItem.lowStockThreshold}
																onChange={(e) =>
																	setEditItem({
																		...editItem,
																		lowStockThreshold: parseInt(e.target.value),
																	})
																}
																className="col-span-3"
															/>
														</div>
													</div>
												)}
												<DialogFooter>
													<Button onClick={handleEditItem}>Update Item</Button>
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
