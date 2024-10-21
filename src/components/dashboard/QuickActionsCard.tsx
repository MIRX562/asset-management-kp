"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const QuickActionsCard = () => (
	<Card className="col-span-1">
		<CardHeader>
			<CardTitle>Quick Actions</CardTitle>
			<CardDescription>Frequently used Actions</CardDescription>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-2">
			<Button>Check-In</Button>
			<Button>Add Asset</Button>
			<Button>Check-Out</Button>
			<Button>Add Maintenance</Button>
		</CardContent>
	</Card>
);

export default QuickActionsCard;
