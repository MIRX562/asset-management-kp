import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

// Define protected and public routes
const protectedRoutes = [
	"/",
	"/assets/:path*",
	"/inventory/:path*",
	"/maintenance/:path*",
	"/reports/:path*",
	"/admin/:path*",
];

const publicRoutes = ["/login", "/login/onboarding"];

// Custom redirect function to handle route protection
export default authMiddleware({
	customRedirect: async (session, request) => {
		const baseURL = request.nextUrl.origin;
		const pathname = request.nextUrl.pathname;

		// If a public route is accessed, let the request through
		if (publicRoutes.some((route) => pathname.startsWith(route))) {
			// If user is signed in and tries to access login, redirect to dashboard
			if (session && pathname === "/login") {
				return NextResponse.redirect(new URL("/dashboard", baseURL));
			}
			return NextResponse.next(); // Allow access to public routes
		}

		// If accessing a protected route
		if (protectedRoutes.some((route) => pathname.startsWith(route))) {
			// Redirect to login if not authenticated
			if (!session) {
				return NextResponse.redirect(new URL("/login", baseURL));
			}
			return NextResponse.next(); // Allow access to protected routes if authenticated
		}

		// Default behavior for other routes
		return NextResponse.next();
	},
});

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
