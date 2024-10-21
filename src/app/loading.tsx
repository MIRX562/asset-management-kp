"use client";

import { motion } from "framer-motion";

export default function Loading() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
			<div className="text-center">
				<motion.svg
					className="w-24 h-24 mx-auto mb-8"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						stroke="white"
						strokeWidth="2"
						fill="none"
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="6"
						stroke="white"
						strokeWidth="2"
						fill="none"
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "linear",
							delay: 0.5,
						}}
					/>
				</motion.svg>
				<motion.h2
					className="text-2xl font-semibold text-white mb-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					Loading...
				</motion.h2>
				<motion.div
					className="flex justify-center space-x-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					{[0, 1, 2].map((index) => (
						<motion.div
							key={index}
							className="w-3 h-3 bg-white rounded-full"
							animate={{
								scale: [1, 1.5, 1],
								opacity: [1, 0.5, 1],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: index * 0.2,
							}}
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}
