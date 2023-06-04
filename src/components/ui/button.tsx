"use client";
import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import useRipple from "@/Hooks/useRipple";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
	"inline-flex items-center justify-center flex-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background relative truncate",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary-hover",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input hover:bg-primary hover:text-black text-white/90",
				secondary:
					"bg-secondary text-primary-foreground hover:bg-primary-hover",
				ghost: "hover:bg-primary hover:text-white",
				link: "underline-offset-8 hover:underline text-primary",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-3 rounded-md",
				lg: "h-11 px-8 rounded-md",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
	ripple?: boolean;
	rippleSpeed?: string;
	rippleColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			children,
			asChild = false,
			isLoading = false,
			ripple = true,
			rippleSpeed = "0.7s",
			rippleColor = "white",
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";
		const [addRipple, ripples] = useRipple({
			background: rippleColor,
			animationDuration: rippleSpeed,
		});

		return (
			<Comp
				ref={ref}
				onMouseDown={addRipple as () => void}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			>
				{isLoading ? <Loader2 className="animate-spin" /> : children}
				{ripple ? (ripples as JSX.Element[]) : null}
			</Comp>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
