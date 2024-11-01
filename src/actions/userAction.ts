"use server";

import prisma from "@/lib/db";
import { Role } from "@prisma/client";

export const setUserAsAdmin = async (userId: string) => {
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			role: Role.ADMIN,
		},
	});
};

export const getUserWithSession = async () => {
	const data = await prisma.user.findMany({
		include: {
			Session: true,
		},
	});
	return data;
};
