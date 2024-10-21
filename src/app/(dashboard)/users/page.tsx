"use client";

import { useState } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2, UserPlus } from "lucide-react";

// Mock data for users
const mockUsers = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		lastLogin: "2023-05-15 10:30 AM",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "Manager",
		lastLogin: "2023-05-14 2:45 PM",
	},
	{
		id: "3",
		name: "Mike Johnson",
		email: "mike@example.com",
		role: "Employee",
		lastLogin: "2023-05-13 9:15 AM",
	},
	{
		id: "4",
		name: "Emily Brown",
		email: "emily@example.com",
		role: "Employee",
		lastLogin: "2023-05-12 11:20 AM",
	},
	{
		id: "5",
		name: "David Wilson",
		email: "david@example.com",
		role: "Manager",
		lastLogin: "2023-05-11 3:50 PM",
	},
];

// Mock data for charts
const roleData = [
	{ name: "Admin", value: 2 },
	{ name: "Manager", value: 5 },
	{ name: "Employee", value: 20 },
];

const activityData = [
	{ name: "Mon", logins: 45 },
	{ name: "Tue", logins: 52 },
	{ name: "Wed", logins: 49 },
	{ name: "Thu", logins: 53 },
	{ name: "Fri", logins: 58 },
	{ name: "Sat", logins: 25 },
	{ name: "Sun", logins: 18 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function UserManagementPage() {
	const [users, setUsers] = useState(mockUsers);
	const [isAddUserOpen, setIsAddUserOpen] = useState(false);
	const [isEditUserOpen, setIsEditUserOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

	const handleAddUser = () => {
		if (newUser.name && newUser.email && newUser.role) {
			setUsers([
				...users,
				{ ...newUser, id: String(users.length + 1), lastLogin: "Never" },
			]);
			setNewUser({ name: "", email: "", role: "" });
			setIsAddUserOpen(false);
			toast({
				title: "User Added",
				description: "New user has been successfully added.",
			});
		}
	};

	const handleEditUser = () => {
		if (currentUser) {
			setUsers(
				users.map((user) => (user.id === currentUser.id ? currentUser : user))
			);
			setIsEditUserOpen(false);
			toast({
				title: "User Updated",
				description: "User information has been successfully updated.",
			});
		}
	};

	const handleDeleteUser = (id) => {
		setUsers(users.filter((user) => user.id !== id));
		toast({
			title: "User Deleted",
			description: "User has been successfully removed.",
		});
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">User Management</h1>
				<Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
					<DialogTrigger asChild>
						<Button>
							<UserPlus className="mr-2 h-4 w-4" />
							Add User
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New User</DialogTitle>
							<DialogDescription>
								Enter the details of the new user.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									value={newUser.name}
									onChange={(e) =>
										setNewUser({ ...newUser, name: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									value={newUser.email}
									onChange={(e) =>
										setNewUser({ ...newUser, email: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="role" className="text-right">
									Role
								</Label>
								<Select
									onValueChange={(value) =>
										setNewUser({ ...newUser, role: value })
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Admin">Admin</SelectItem>
										<SelectItem value="Manager">Manager</SelectItem>
										<SelectItem value="Employee">Employee</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<DialogFooter>
							<Button onClick={handleAddUser}>Add User</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<Card>
					<CardHeader>
						<CardTitle>User Roles Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={{}} className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={roleData}
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
										{roleData.map((entry, index) => (
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
						<CardTitle>User Login Activity (Last 7 Days)</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={{}} className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={activityData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar dataKey="logins" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>User List</CardTitle>
					<CardDescription>
						Manage system users, their roles, and recent activity.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Last Login</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell>{user.lastLogin}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => {
													setCurrentUser(user);
													setIsEditUserOpen(true);
												}}
											>
												<Edit className="h-4 w-4" />
												<span className="sr-only">Edit</span>
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleDeleteUser(user.id)}
											>
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

			<Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit User</DialogTitle>
						<DialogDescription>Update user information.</DialogDescription>
					</DialogHeader>
					{currentUser && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="edit-name" className="text-right">
									Name
								</Label>
								<Input
									id="edit-name"
									value={currentUser.name}
									onChange={(e) =>
										setCurrentUser({ ...currentUser, name: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="edit-email" className="text-right">
									Email
								</Label>
								<Input
									id="edit-email"
									type="email"
									value={currentUser.email}
									onChange={(e) =>
										setCurrentUser({ ...currentUser, email: e.target.value })
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="edit-role" className="text-right">
									Role
								</Label>
								<Select
									value={currentUser.role}
									onValueChange={(value) =>
										setCurrentUser({ ...currentUser, role: value })
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Admin">Admin</SelectItem>
										<SelectItem value="Manager">Manager</SelectItem>
										<SelectItem value="Employee">Employee</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button onClick={handleEditUser}>Update User</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
