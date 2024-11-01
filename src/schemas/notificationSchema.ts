import { z } from "zod";

export const createNotificationSchema = z.object({
	userId: z.string().uuid("User ID must be a valid UUID"),
	assetId: z.string().uuid("Asset ID must be a valid UUID").optional(),
	inventoryId: z.string().uuid("Inventory ID must be a valid UUID").optional(),
	message: z.string().min(1, "Message is required"),
	type: z.enum([
		"ASSET_CHECKOUT_REMINDER",
		"LOW_INVENTORY_ALERT",
		"MAINTENANCE_REMINDER",
	]),
	read: z.boolean().default(false),
});

export const updateNotificationSchema = z.object({
	userId: z.string().uuid("User ID must be a valid UUID").optional(),
	assetId: z.string().uuid("Asset ID must be a valid UUID").optional(),
	inventoryId: z.string().uuid("Inventory ID must be a valid UUID").optional(),
	message: z.string().optional(),
	type: z
		.enum([
			"ASSET_CHECKOUT_REMINDER",
			"LOW_INVENTORY_ALERT",
			"MAINTENANCE_REMINDER",
		])
		.optional(),
	read: z.boolean().optional(),
});
