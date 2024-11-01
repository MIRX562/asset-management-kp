"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Bell, Globe, Lock, Mail } from "lucide-react";

// Mock data for current settings
const mockSettings = {
	email: "john.doe@example.com",
	notificationPreferences: {
		email: true,
		push: false,
		sms: true,
	},
	timezone: "America/New_York",
	dateFormat: "MM/DD/YYYY",
	isAdmin: true, // This would typically come from an auth context
};

const timezones = [
	"America/New_York",
	"America/Chicago",
	"America/Denver",
	"America/Los_Angeles",
	"Europe/London",
	"Asia/Tokyo",
];

const dateFormats = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];

export default function SettingsPage() {
	const [settings, setSettings] = useState(mockSettings);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleNotificationChange = (key: string) => {
		// setSettings((prev) => ({
		// 	...prev,
		// 	notificationPreferences: {
		// 		...prev.notificationPreferences,
		// 		[key]: !prev.notificationPreferences[key],
		// 	},
		// }));
	};

	const handleSaveSettings = () => {
		// Here you would typically make an API call to save the settings
		console.log("Saving settings:", settings);
		if (newPassword && newPassword === confirmPassword) {
			console.log("New password:", newPassword);
		}
		toast({
			title: "Settings Saved",
			description: "Your settings have been successfully updated.",
		});
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Profile Settings */}
				<Card>
					<CardHeader>
						<CardTitle>Profile Settings</CardTitle>
						<CardDescription>
							Manage your account details and preferences
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<div className="flex">
								<Mail className="w-4 h-4 mr-2 mt-3" />
								<Input
									id="email"
									value={settings.email}
									onChange={(e) =>
										setSettings({ ...settings, email: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="new-password">New Password</Label>
							<div className="flex">
								<Lock className="w-4 h-4 mr-2 mt-3" />
								<Input
									id="new-password"
									type="password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirm-password">Confirm New Password</Label>
							<div className="flex">
								<Lock className="w-4 h-4 mr-2 mt-3" />
								<Input
									id="confirm-password"
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Notification Preferences */}
				<Card>
					<CardHeader>
						<CardTitle>Notification Preferences</CardTitle>
						<CardDescription>
							Choose how you want to receive notifications
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="notifications-email"
								checked={settings.notificationPreferences.email}
								onCheckedChange={() => handleNotificationChange("email")}
							/>
							<Label htmlFor="notifications-email">Email Notifications</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="notifications-push"
								checked={settings.notificationPreferences.push}
								onCheckedChange={() => handleNotificationChange("push")}
							/>
							<Label htmlFor="notifications-push">Push Notifications</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="notifications-sms"
								checked={settings.notificationPreferences.sms}
								onCheckedChange={() => handleNotificationChange("sms")}
							/>
							<Label htmlFor="notifications-sms">SMS Notifications</Label>
						</div>
					</CardContent>
				</Card>

				{/* System Settings */}
				{settings.isAdmin && (
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>System Settings</CardTitle>
							<CardDescription>
								Configure system-wide settings (Admin only)
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="timezone">Timezone</Label>
								<div className="flex">
									<Globe className="w-4 h-4 mr-2 mt-3" />
									<Select
										value={settings.timezone}
										onValueChange={(value) =>
											setSettings({ ...settings, timezone: value })
										}
									>
										<SelectTrigger id="timezone" className="w-full">
											<SelectValue placeholder="Select timezone" />
										</SelectTrigger>
										<SelectContent>
											{timezones.map((tz) => (
												<SelectItem key={tz} value={tz}>
													{tz}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="date-format">Date Format</Label>
								<div className="flex">
									<Bell className="w-4 h-4 mr-2 mt-3" />
									<Select
										value={settings.dateFormat}
										onValueChange={(value) =>
											setSettings({ ...settings, dateFormat: value })
										}
									>
										<SelectTrigger id="date-format" className="w-full">
											<SelectValue placeholder="Select date format" />
										</SelectTrigger>
										<SelectContent>
											{dateFormats.map((format) => (
												<SelectItem key={format} value={format}>
													{format}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>

			<div className="mt-6 flex justify-end">
				<Button onClick={handleSaveSettings}>Save Settings</Button>
			</div>
		</div>
	);
}
