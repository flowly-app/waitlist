import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface InputFieldProps extends React.ComponentProps<"input"> {
	placeholder?: string;
}

export function InputField({
	placeholder = "Your email address",
	className,
	...props
}: InputFieldProps) {
	return (
		<Input
			placeholder={placeholder}
			className={cn(
				"rounded-full transition-all duration-200",
				"focus:outline-none focus:ring-2 focus:ring-white/20",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"h-[4.4rem] min-w-[28rem] px-8 !text-[1.4rem]",
				"backdrop-blur-[4.5px] bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.15)]",
				"text-white placeholder:text-white/60",
				"hover:bg-[rgba(255,255,255,0.2)]",
				"focus:bg-[rgba(255,255,255,0.2)] focus:border-[rgba(255,255,255,0.3)]",
				className,
			)}
			{...props}
		/>
	);
}
