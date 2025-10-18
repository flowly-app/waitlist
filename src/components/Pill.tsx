import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface PillProps {
	title: string;
	icon?: ReactNode;
	className?: string;
}

export function Pill({ title, icon, className }: PillProps) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"rounded-full px-3 py-2 text-[1.4rem] font-light",
				"border-white/15 bg-transparent text-white/80",
				"gap-1.5",
				className,
			)}
		>
			{icon && (
				<span className="flex items-center">
					{React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
						size: 14,
					})}
				</span>
			)}
			{title}
		</Badge>
	);
}
