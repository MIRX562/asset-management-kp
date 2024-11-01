import { z } from "zod";

export const createAssetSchema = z.object({
	serialNumber: z.string().min(1, "Serial Number is required"),
	categoryId: z.string().uuid("Category ID must be a valid UUID"),
	typeId: z.string().uuid("Type ID must be a valid UUID"),
	purchaseDate: z.date(),
	status: z.enum(["AVAILABLE", "IN_USE", "MAINTENANCE", "DECOMMISSIONED"]),
});

export const updateAssetSchema = z.object({
	serialNumber: z.string().optional(),
	categoryId: z.string().uuid("Category ID must be a valid UUID").optional(),
	typeId: z.string().uuid("Type ID must be a valid UUID").optional(),
	purchaseDate: z.date().optional(),
	status: z
		.enum(["AVAILABLE", "IN_USE", "MAINTENANCE", "DECOMMISSIONED"])
		.optional(),
});
