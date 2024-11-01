import { Role } from "@prisma/client";
import { z } from "zod";

// Define the Session schema
const sessionSchema = z.object({
	id: z.string(),
	expiresAt: z.date(),
	ipAddress: z.string().nullable(),
	userAgent: z.string().nullable(),
	userId: z.string(),
});

// Define the User schema
const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	emailVerified: z.boolean(),
	name: z.string(),
	role: z.nativeEnum(Role), // Adjust enum values based on your Role definition
	imageId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
	// Define any additional fields or relations if necessary
});

// Combine User and Session schemas for UserWithSession
const userWithSessionSchema = userSchema.extend({
	sessions: z.array(sessionSchema), // Array of sessions
});

// Export the schema
export { userWithSessionSchema };
