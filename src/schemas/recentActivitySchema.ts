import { z } from "zod";

export const createRecentActivitySchema = z.object({
	userId: z.string().uuid("User ID must be a valid UUID"),
	assetId: z.string().uuid("Asset ID must be a valid UUID").optional(),
	inventoryId: z.string().uuid("Inventory ID must be a valid UUID").optional(),
	actionType: z.enum([
		"CHECKOUT",
		"CHECKIN",
		"MAINTENANCE_SCHEDULED",
		"MAINTENANCE_COMPLETED",
		"INVENTORY_ADDED",
		"INVENTORY_REMOVED",
		"ASSET_CREATED",
		"ASSET_UPDATED",
	]),
	description: z.string().min(1, "Description is required"),
});

export const updateRecentActivitySchema = z.object({
	userId: z.string().uuid("User ID must be a valid UUID").optional(),
	assetId: z.string().uuid("Asset ID must be a valid UUID").optional(),
	inventoryId: z.string().uuid("Inventory ID must be a valid UUID").optional(),
	actionType: z
		.enum([
			"CHECKOUT",
			"CHECKIN",
			"MAINTENANCE_SCHEDULED",
			"MAINTENANCE_COMPLETED",
			"INVENTORY_ADDED",
			"INVENTORY_REMOVED",
			"ASSET_CREATED",
			"ASSET_UPDATED",
		])
		.optional(),
	description: z.string().optional(),
});
