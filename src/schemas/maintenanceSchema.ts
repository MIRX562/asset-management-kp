import { z } from "zod";

export const createMaintenanceSchema = z.object({
	assetId: z.string().uuid("Asset ID must be a valid UUID"),
	performedBy: z.string().min(1, "Performed By is required"),
	description: z.string().min(1, "Description is required"),
	maintenanceDate: z.date(),
	nextMaintenance: z.date().optional(),
	cost: z.number().positive(),
});

export const updateMaintenanceSchema = z.object({
	assetId: z.string().uuid("Asset ID must be a valid UUID").optional(),
	performedBy: z.string().optional(),
	description: z.string().optional(),
	maintenanceDate: z.date().optional(),
	nextMaintenance: z.date().optional(),
	cost: z.number().positive().optional(),
});
