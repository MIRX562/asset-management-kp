"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

type ReusableFormDialogProps = {
	triggerButtonText: string;
	children: ReactNode;
};

export default function InsertDataDialog({
	triggerButtonText,
	children,
}: ReusableFormDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="gap-2 h-8">
					<PlusCircle className="h-4 w-4" />
					{triggerButtonText}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
		</Dialog>
	);
}
