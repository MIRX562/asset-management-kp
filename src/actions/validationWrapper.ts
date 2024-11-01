import { z, ZodSchema } from "zod";

// Wrapper function for validation and error handling
export async function validateAndExecute<T, U>(
	schema: ZodSchema<T>, // Zod schema for input validation
	action: (input: T, userId: string) => Promise<U>, // The actual action (Prisma query or logic)
	input: T, // The input data
	userId: string // The user ID for authorization validation
): Promise<U> {
	try {
		// Validate the input using the provided schema
		const validation = schema.safeParse(input);

		if (!validation.success) {
			throw new Error(
				validation.error.errors.map((err) => err.message).join(", ")
			);
		}

		// Ensure the userId is valid
		if (!userId || !z.string().cuid().safeParse(userId).success) {
			throw new Error("Invalid user ID");
		}

		// Execute the action with validated input
		return await action(validation.data, userId);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// Error handling
		console.error("Error executing action:", error.message);
		throw new Error(`Action failed: ${error.message}`);
	}
}
