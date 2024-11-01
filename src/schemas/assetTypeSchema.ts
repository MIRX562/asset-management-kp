import { z } from "zod";

export const createAssetTypeSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	imageId: z.string().optional(),
});

export const updateAssetTypeSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	description: z.string().optional(),
});
