import React, { FC } from "react";
import Container from "./container";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	pretitle?: string;
	title?: string;
}
const SectionTitle: FC<Props> = (props) => {
	return (
		<Container
			className={cn(
				"flex flex-col items-center justify-center px-0",
				props.className
			)}
		>
			{props.pretitle && (
				<div className="text-sm font-bold tracking-wider text-accent uppercase">
					{props.pretitle}
				</div>
			)}

			{props.title && (
				<h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-5xl dark:text-white relative">
					{props.title}
				</h2>
			)}

			{props.children && (
				<p className="max-w-4xl py-4 text-lg leading-normal text-white/80">
					{props.children}
				</p>
			)}
		</Container>
	);
};

export default SectionTitle;
