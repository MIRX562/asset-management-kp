import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20">
			<div className="relative">
				<div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
				<div className="relative bg-background rounded-xl p-8 shadow-lg">
					<Loader2 className="h-12 w-12 animate-spin text-primary" />
				</div>
			</div>
			<p className="mt-4 text-lg font-medium text-muted-foreground animate-pulse">
				Loading...
			</p>
			<div className="mt-8 space-y-2">
				<div className="h-2 w-48 bg-muted rounded animate-pulse"></div>
				<div className="h-2 w-32 bg-muted rounded animate-pulse"></div>
			</div>
		</div>
	);
}