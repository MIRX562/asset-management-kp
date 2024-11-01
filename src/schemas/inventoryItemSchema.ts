import { z } from "zod";

export const createInventoryItemSchema = z.object({
	name: z.string().min(1, "Name is required"),
	categoryId: z.string().uuid("Category ID must be a valid UUID"),
	quantity: z.number().int().positive(),
	lowStockThreshold: z.number().int().nonnegative(),
	imageId: z.string().optional(),
});

export const updateInventoryItemSchema = z.object({
	name: z.string().optional(),
	categoryId: z.string().uuid("Category ID must be a valid UUID").optional(),
	quantity: z.number().int().positive().optional(),
	lowStockThreshold: z.number().int().nonnegative().optional(),
});
