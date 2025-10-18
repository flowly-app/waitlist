import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface TextButtonProps
	extends Omit<React.ComponentProps<"button">, "variant"> {
	variant?: "primary" | "secondary";
	title: string;
}

export function TextButton({
	variant = "primary",
	className,
	title,
	...props
}: TextButtonProps) {
	const variantStyles = {
		primary: "bg-white text-[#111111] hover:bg-white/90 font-medium",
		secondary:
			"bg-transparent text-white border border-white/20 hover:bg-white/10 font-medium",
	};

	return (
		<Button
			className={cn(
				"rounded-full transition-all duration-200",
				"focus:outline-none focus:ring-2 focus:ring-white/20",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"h-[4.4rem] px-8 text-[1.4rem]",
				variantStyles[variant],
				className,
			)}
			{...props}
		>
			{title}
		</Button>
	);
}

// Export all button types
