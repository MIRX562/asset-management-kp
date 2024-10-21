import { Card } from "@/components/ui/card";

const StatusCards = () => (
	<div className="grid grid-cols-3 items-center justify-center gap-4 col-span-3">
		<Card className="flex items-center justify-center h-32 col-span-1">
			Maintenance Due
		</Card>
		<Card className="flex items-center justify-center h-32 col-span-1">
			Assets Overdue
		</Card>
		<Card className="flex items-center justify-center h-32 col-span-1">
			Inventory Low
		</Card>
	</div>
);

export default StatusCards;
