// app/api/users/check/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Assuming prisma is set up in lib/db

export async function GET() {
	try {
		const user = await prisma.user.findFirst();
		// If no users exist, return exists: false
		if (!user) {
			return NextResponse.json({ exists: false });
		}
		// If users exist, return exists: true
		return NextResponse.json({ exists: true });
	} catch (error) {
		console.error("Error checking user existence:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
