import Header from "@/components/navigation/header";
import Sidebar from "@/components/navigation/sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<Sidebar />
			</div>
			<div className="flex flex-col h-screen">
				<Header />
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
