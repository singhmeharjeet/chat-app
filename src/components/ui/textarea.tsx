import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { inputVariants } from "./input";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof inputVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex min-h-[80px] w-full",
					inputVariants(),
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
