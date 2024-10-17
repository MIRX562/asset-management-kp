import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { OnBoardingForm } from "./form";

function page() {
	return (
		<div className="w-full h-screen flex items-center justify-center bg-">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Create Your Admin Account</CardTitle>
					<CardDescription>
						Hello, looks like it&apos;s your first time running the app. you
						need to create the main admin account
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<OnBoardingForm />
				</CardContent>
			</Card>
		</div>
	);
}

export default page;
