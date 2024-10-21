"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center"
			>
				<motion.h1
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						delay: 0.2,
						type: "spring",
						stiffness: 260,
						damping: 20,
					}}
					className="text-9xl font-extrabold text-white tracking-widest"
				>
					404
				</motion.h1>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="bg-white px-2 text-sm rounded rotate-12 absolute"
				>
					Page Not Found
				</motion.div>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.5 }}
					className="text-white mt-5"
				>
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</motion.p>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
				>
					<Link href="/">
						<Button className="mt-10" variant="secondary">
							Go Home
						</Button>
					</Link>
				</motion.div>
			</motion.div>
			<motion.div
				animate={{
					scale: [1, 1.1, 1],
					rotate: [0, 5, -5, 0],
				}}
				transition={{
					duration: 5,
					ease: "easeInOut",
					times: [0, 0.2, 0.5, 0.8, 1],
					repeat: Infinity,
					repeatDelay: 1,
				}}
				className="absolute bottom-10 right-10"
			>
				<div className="text-white text-9xl">🚀</div>
			</motion.div>
		</div>
	);
}
