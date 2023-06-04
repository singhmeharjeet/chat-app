import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Container = forwardRef<HTMLDivElement, Props>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"w-full p-10 mx-auto",
					className ? className : ""
				)}
			>
				{children}
			</div>
		);
	}
);

export default Container;
