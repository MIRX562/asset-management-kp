import AssetCard from "@/components/dashboard/AssetCard";
import GenerateReportsCard from "@/components/dashboard/GenerateReportsCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatusCards from "@/components/dashboard/StatusCards";

export default function Dashboard() {
	return (
		<div className="flex flex-col w-full h-full gap-6">
			<div className="flex w-full items-center justify-between">
				<h1 className="font-bold text-3xl">Welcome back (user)</h1>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="grid grid-cols-3 col-span-2 gap-4">
					<AssetCard title="Assets in Use" value={26} />
					<AssetCard title="Assets Available" value={26} />
					<AssetCard title="Assets in Maintenance" value={26} />
				</div>

				<GenerateReportsCard />

				<RecentActivity />

				<QuickActionsCard />

				<StatusCards />
			</div>
		</div>
	);
}
