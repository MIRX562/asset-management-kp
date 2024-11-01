import { z } from "zod";

export const createMediaSchema = z.object({
	url: z.string().url("URL must be a valid URL"),
	type: z.string().min(1, "Type is required"),
});

export const updateMediaSchema = z.object({
	url: z.string().url("URL must be a valid URL").optional(),
	type: z.string().optional(),
});
