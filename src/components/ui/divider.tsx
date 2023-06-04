"use client";
import { VariantProps, cva } from "class-variance-authority";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import React from "react";
import { cn } from "@/lib/utils";

const verticalDividerVariants = cva("bg-slate-400 rounded-md", {
	variants: {
		width: {
			sm: "w-[1px]",
			md: "w-[2px]",
			lg: "w-[3px]",
		},
		height: {
			quater: "h-25",
			half: "h-50",
			full: "h-100",
		},
	},
	defaultVariants: {
		width: "md",
		height: "full",
	},
});
const HorizontalDividerVariants = cva("bg-slate-400 rounded-md", {
	variants: {
		height: {
			sm: "h-[1px]",
			md: "h-[2px]",
			lg: "h-[3px]",
		},
		width: {
			quater: "w-25",
			half: "w-50",
			full: "w-full",
		},
	},
	defaultVariants: {
		height: "md",
		width: "full",
	},
});

export interface VerticalDividerProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>,
		VariantProps<typeof verticalDividerVariants> {}

export const VerticalDivider = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Separator>,
	VerticalDividerProps
>(({ className, width, height, ...props }, ref) => (
	<MenubarPrimitive.Separator
		ref={ref}
		className={cn(verticalDividerVariants({ height, width }), className)}
		{...props}
	/>
));

export interface HorizontalDividerProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>,
		VariantProps<typeof HorizontalDividerVariants> {}

export const HorizontalDivider = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Separator>,
	HorizontalDividerProps
>(({ className, width, height, ...props }, ref) => (
	<MenubarPrimitive.Separator
		ref={ref}
		className={cn(HorizontalDividerVariants({ width, height }), className)}
		{...props}
	/>
));
