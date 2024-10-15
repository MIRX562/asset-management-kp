import { Bell } from "lucide-react"; // Import the Bell icon
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const notifications = [
	{ id: 1, message: "New message from John", timestamp: "2 minutes ago" },
	{ id: 2, message: "Your report has been generated", timestamp: "1 hour ago" },
	{
		id: 3,
		message: "System maintenance scheduled for tonight",
		timestamp: "3 hours ago",
	},
];

export function NotificationPanelSheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					<Bell className="h-5 w-5" />
					<span className="sr-only">View notifications</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Notifications</SheetTitle>
					<SheetDescription>
						Here are your latest notifications.
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					{notifications.length > 0 ? (
						notifications.map((notification) => (
							<div
								key={notification.id}
								className="flex items-center justify-between p-2 border-b"
							>
								<span>{notification.message}</span>
								<span className="text-xs text-muted">
									{notification.timestamp}
								</span>
							</div>
						))
					) : (
						<div className="text-center py-4 text-muted-foreground">
							No notifications available.
						</div>
					)}
				</div>
				<SheetClose asChild>
					<Button variant="outline" className="mt-4">
						Close
					</Button>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}

export function NotificationPanelPop() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="shrink-0">
					<Bell className="h-5 w-5" />
					<span className="sr-only">View notifications</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-4">
				<h4 className="font-medium leading-none">Notifications</h4>
				<p className="text-sm text-muted-foreground mb-2">
					Here are your latest notifications:
				</p>
				<div className="grid gap-2">
					{notifications.length > 0 ? (
						notifications.map((notification) => (
							<div
								key={notification.id}
								className="flex items-center justify-between p-2 border-b"
							>
								<span>{notification.message}</span>
								<span className="text-xs text-muted">
									{notification.timestamp}
								</span>
							</div>
						))
					) : (
						<div className="text-center py-4 text-muted-foreground">
							No notifications available.
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
