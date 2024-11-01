import { z } from "zod";

export const createAssetCategorySchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	userId: z.string().uuid("User ID must be a valid UUID"),
});

export const updateAssetCategorySchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	description: z.string().optional(),
});
