"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const GenerateReportsCard = () => (
	<Card className="col-span-1">
		<CardHeader>
			<CardTitle>Generate Reports</CardTitle>
			<CardDescription>Generate reports regarding your assets</CardDescription>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-2">
			<Button>Asset Overview</Button>
			<Button>Maintenance Log</Button>
			<Button>Check-Out History</Button>
			<Button>Inventory Status</Button>
		</CardContent>
	</Card>
);

export default GenerateReportsCard;
