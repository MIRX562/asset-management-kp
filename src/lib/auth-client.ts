import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, session } =
	createAuthClient({
		baseURL: process.env.BETTER_AUTH_URL,
	});
