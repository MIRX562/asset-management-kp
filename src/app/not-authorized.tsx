"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Lock } from "lucide-react";

export default function NotAuthorizedPage() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
			<Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-none text-white">
				<CardHeader>
					<div className="flex justify-center mb-4">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
							}}
						>
							<Lock className="w-16 h-16 text-yellow-400" />
						</motion.div>
					</div>
					<CardTitle className="text-3xl font-bold text-center">
						Access Denied
					</CardTitle>
					<CardDescription className="text-gray-300 text-center">
						Oops! You don&apos;t have the necessary permissions to access this
						page.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start">
							<AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
							<p className="text-sm">
								If you believe this is an error, please contact your system
								administrator or try logging out and logging back in.
							</p>
						</div>
					</motion.div>
				</CardContent>
				<CardFooter className="flex justify-center space-x-4">
					<Button variant="outline" onClick={() => window.history.back()}>
						<ArrowLeft className="mr-2 h-4 w-4" /> Go Back
					</Button>
					<Button onClick={() => (window.location.href = "/")}>Home</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
