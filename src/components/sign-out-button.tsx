"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				signOut();
				router.push("login");
			}}
		>
			Log Out
		</div>
	);
};

export default SignOutButton;
