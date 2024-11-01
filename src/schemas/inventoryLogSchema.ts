import { z } from "zod";

export const createInventoryLogSchema = z.object({
	inventoryItemId: z.string().uuid("Inventory Item ID must be a valid UUID"),
	action: z.enum(["ADDED", "CONSUMED", "REMOVED"]),
	quantity: z.number().int().positive(),
	description: z.string().min(1, "Description is required"),
});

export const updateInventoryLogSchema = z.object({
	inventoryItemId: z
		.string()
		.uuid("Inventory Item ID must be a valid UUID")
		.optional(),
	action: z.enum(["ADDED", "CONSUMED", "REMOVED"]).optional(),
	quantity: z.number().int().positive().optional(),
	description: z.string().optional(),
});
