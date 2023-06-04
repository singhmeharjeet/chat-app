import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";
import Container from "./container";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	imgPos?: "left" | "right";
	data: {
		title: string;
		desc: string;
		imgPos?: "left" | "right";
		image: StaticImageData;
		bullets: {
			title: string;
			desc: string;
			icon: React.JSX.Element;
		}[];
	};
}

const Benefits: FC<Props> = (props) => {
	const { data } = props;
	return (
		<>
			<Container
				className={cn(
					"flex flex-wrap lg:gap-10 lg:flex-nowrap items-center h-full p-2",
					props.className
				)}
			>
				<div
					className={cn(
						"flex items-center justify-center w-full lg:w-1/2",
						props.imgPos === "right" ? "lg:order-1" : ""
					)}
				>
					<div>
						<Image
							src={data.image}
							width="521"
							height="521"
							alt="Benefits"
							className="object-cover h-auto"
						/>
					</div>
				</div>

				<div
					className={`flex flex-wrap items-center w-full lg:w-1/2 ${
						data.imgPos === "right" ? "lg:justify-end" : ""
					}`}
				>
					<div>
						<div className="flex flex-col w-full mt-4">
							<h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-accent">
								{data.title}
							</h3>

							<p className="max-w-2xl py-4 text-base leading-normal lg:text-md text-white/80">
								{data.desc}
							</p>
						</div>

						<div className="w-full mt-5">
							{data.bullets.map((item, index) => (
								<Benefit
									key={index}
									title={item.title}
									icon={item.icon}
								>
									{item.desc}
								</Benefit>
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

function Benefit(props: { title: string; icon: any; children: ReactNode }) {
	return (
		<>
			<div className="flex items-start mt-8 space-x-3">
				<div className="flex items-center justify-center flex-shrink-0 mt-1 border-white/40 border-2 rounded-md w-11 h-11 ">
					{React.cloneElement(props.icon, {
						className: "w-7 h-7 text-indigo-50",
					})}
				</div>
				<div>
					<h4 className="text-xl font-semibold text-gray-800 dark:text-white/80">
						{props.title}
					</h4>
					<p className="mt-1 text-gray-500 lg:text-sm dark:text-white/70">
						{props.children}
					</p>
				</div>
			</div>
		</>
	);
}

export default Benefits;
