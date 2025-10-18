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
				"glassmorphism rounded-full",
				"h-[4.4rem] w-full sm:max-w-[28rem] px-8 !text-[1.4rem]",
				"placeholder:text-white/60",
				className,
			)}
			{...props}
		/>
	);
}
