import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const inputVariants = cva(
	"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm  text-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input/80  focus:ring-offset-1 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600",
	{ variants: {}, defaultVariants: {} }
);

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants(), className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
