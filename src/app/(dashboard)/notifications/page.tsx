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
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import {
	Bell,
	CheckCircle,
	Clock,
	TriangleAlert,
	Eye,
	Laptop,
	Package,
} from "lucide-react";

// Mock data for notifications
const mockNotifications = [
	{
		id: "1",
		type: "check-out",
		message: "Asset 'Laptop #12345' is due in 2 days",
		date: "2023-06-15 10:30 AM",
		read: false,
	},
	{
		id: "2",
		type: "maintenance",
		message: "Scheduled maintenance for 'Printer XYZ' tomorrow",
		date: "2023-06-14 2:45 PM",
		read: true,
	},
	{
		id: "3",
		type: "low-inventory",
		message: "Low stock alert: Office supplies running low",
		date: "2023-06-13 9:15 AM",
		read: false,
	},
	{
		id: "4",
		type: "overdue",
		message: "Asset 'Projector ABC' is overdue",
		date: "2023-06-12 11:20 AM",
		read: false,
	},
	{
		id: "5",
		type: "check-out",
		message: "New asset 'iPhone 13' has been checked out to John Doe",
		date: "2023-06-11 3:50 PM",
		read: true,
	},
];

const notificationTypes = {
	"check-out": { icon: Laptop, color: "bg-blue-500" },
	maintenance: { icon: Clock, color: "bg-yellow-500" },
	"low-inventory": { icon: Package, color: "bg-orange-500" },
	overdue: { icon: TriangleAlert, color: "bg-red-500" },
};

export default function NotificationPage() {
	const [notifications, setNotifications] = useState(mockNotifications);
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
		[]
	);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const filteredNotifications = notifications.filter(
		(notification) =>
			notification.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(typeFilter === "all" || notification.type === typeFilter) &&
			(statusFilter === "all" ||
				(statusFilter === "read" ? notification.read : !notification.read))
	);

	const paginatedNotifications = filteredNotifications.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedNotifications(paginatedNotifications.map((n) => n.id));
		} else {
			setSelectedNotifications([]);
		}
	};

	const handleSelectNotification = (id: string) => {
		setSelectedNotifications((prev) =>
			prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
		);
	};

	const handleMarkAsRead = (ids: string[]) => {
		setNotifications(
			notifications.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n))
		);
		setSelectedNotifications([]);
	};

	const handleMarkAsUnread = (ids: string[]) => {
		setNotifications(
			notifications.map((n) => (ids.includes(n.id) ? { ...n, read: false } : n))
		);
		setSelectedNotifications([]);
	};

	const handleDeleteNotifications = (ids: string[]) => {
		setNotifications(notifications.filter((n) => !ids.includes(n.id)));
		setSelectedNotifications([]);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Notifications</h1>

			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<Input
					placeholder="Search notifications..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="md:w-1/3"
				/>
				<Select value={typeFilter} onValueChange={setTypeFilter}>
					<SelectTrigger className="md:w-1/4">
						<SelectValue placeholder="Filter by type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="check-out">Check-Out</SelectItem>
						<SelectItem value="maintenance">Maintenance</SelectItem>
						<SelectItem value="low-inventory">Low Inventory</SelectItem>
						<SelectItem value="overdue">Overdue</SelectItem>
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="md:w-1/4">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="read">Read</SelectItem>
						<SelectItem value="unread">Unread</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Notification List</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between mb-4">
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleMarkAsRead(selectedNotifications)}
								disabled={selectedNotifications.length === 0}
							>
								Mark as Read
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleMarkAsUnread(selectedNotifications)}
								disabled={selectedNotifications.length === 0}
							>
								Mark as Unread
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleDeleteNotifications(selectedNotifications)}
								disabled={selectedNotifications.length === 0}
							>
								Delete Selected
							</Button>
						</div>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]">
									<Checkbox
										checked={
											selectedNotifications.length ===
											paginatedNotifications.length
										}
										onCheckedChange={handleSelectAll}
									/>
								</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Message</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginatedNotifications.map((notification) => (
								<TableRow key={notification.id}>
									<TableCell>
										<Checkbox
											checked={selectedNotifications.includes(notification.id)}
											onCheckedChange={() =>
												handleSelectNotification(notification.id)
											}
										/>
									</TableCell>
									<TableCell>Icon</TableCell>
									<TableCell>{notification.message}</TableCell>
									<TableCell>{notification.date}</TableCell>
									<TableCell>
										<Badge
											variant={notification.read ? "secondary" : "default"}
										>
											{notification.read ? "Read" : "Unread"}
										</Badge>
									</TableCell>
									<TableCell>
										<Button variant="ghost" size="icon">
											<Eye className="h-4 w-4" />
											<span className="sr-only">View Details</span>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Pagination className="mt-4">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 1))
									}
									disabled={currentPage === 1}
								/>
							</PaginationItem>
							{[
								...Array(
									Math.ceil(filteredNotifications.length / itemsPerPage)
								),
							].map((_, i) => (
								<PaginationItem key={i}>
									<PaginationLink
										onClick={() => setCurrentPage(i + 1)}
										isActive={currentPage === i + 1}
									>
										{i + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										setCurrentPage((prev) =>
											Math.min(
												prev + 1,
												Math.ceil(filteredNotifications.length / itemsPerPage)
											)
										)
									}
									disabled={
										currentPage ===
										Math.ceil(filteredNotifications.length / itemsPerPage)
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</CardContent>
			</Card>
		</div>
	);
}
