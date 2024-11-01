"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/template/table/data-table-column-header";
import { DataTableRowActions } from "@/components/template/table/data-table-row-actions";

import { User, Session } from "@prisma/client";

export interface UserWithSession extends User {
	Session: Session[]; // This assumes the relation to Session exists
}

export const userColumns: ColumnDef<UserWithSession>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => (
			<div className="w-[80px] text-ellipsis truncate">
				{row.getValue("id")}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("name")}</span>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => <span>{row.getValue("email")}</span>,
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			const role: string = row.getValue("role");
			return <Badge>{role}</Badge>;
		},
	},
	{
		id: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const sessionCount = row.original.Session?.length || 0;
			const status = sessionCount > 0 ? "Active" : "Inactive";
			return status === "Active" ? (
				<Badge variant="success">Active</Badge>
			) : (
				<Badge variant="destructive">Inactive</Badge>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<DataTableRowActions
				row={row}
				onEdit={(data) => {
					console.log("Edit User:", data);
					// Implement your edit logic here
				}}
				onDelete={(data) => {
					console.log("Delete User:", data);
					// Implement your delete logic here
				}}
			/>
		),
	},
];
