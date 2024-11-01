import Header from "@/components/navigation/header";
import Sidebar from "@/components/navigation/sidebar";
import { getSession } from "@/lib/session"; // assuming you have the async function now
import NotAuthorizedPage from "../not-authorized";
import { Role } from "@prisma/client";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Await session here
	const session = await getSession();
	//@ts-expect-error any
	const currentRole: Role | null = session?.user?.role ?? null;

	// If no role, show NotAuthorizedPage
	if (!currentRole) {
		return <NotAuthorizedPage />;
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<Sidebar role={currentRole} />
			</div>
			<div className="flex flex-col h-screen">
				<Header />
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
