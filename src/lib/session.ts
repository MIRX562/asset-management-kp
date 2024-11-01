import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export async function getSession() {
	try {
		const session = await auth.api.getSession({
			headers: headers(), // pass the headers object.
		});
		return session; // always return something, fallback to empty object if session is null/undefined
	} catch (error) {
		console.error("Failed to get session:", error);
		return {}; // return empty object in case of an error
	}
}
