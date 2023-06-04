"use client";
import React, { useState } from "react";

const MINIMUM_RIPPLE_SIZE = 100;

export default function useRipple(style: Object) {
	const [ripples, setRipples] = useState<{ key: number; style: Object }[]>(
		[]
	);

	const showRipple = (event: {
		clientX: number;
		pageX: number;
		pageY: number;
		clientY: number;
		target: HTMLElement;
		timeStamp: number;
		currentTarget: HTMLElement;
		preventDefault: () => void;
	}) => {
		const { left, top } = event.target.getClientRects()[0];

		const x = event.pageX - left;
		const y = event.pageY - top;
		const rippleSize = Math.min(
			event.currentTarget.clientHeight,
			event.currentTarget.clientWidth,
			MINIMUM_RIPPLE_SIZE
		);

		const newRipple = {
			key: event.timeStamp,
			style: {
				display: "block",
				width: rippleSize,
				height: rippleSize,
				position: "absolute",
				left: x - rippleSize / 2,
				top: y - rippleSize / 2,
				borderRadius: "50%",
				opacity: 0.2,
				pointerEvents: "none",
				animationName: "useRippleAnimation",
				animationTimingFunction: "ease-in-out",
				...style,
			},
		};

		setRipples((ripples) => [...ripples, newRipple]);
	};

	const ripplesArray: JSX.Element[] = ripples?.map((currentRipple) => {
		const handleAnimationEnd = (e: any) => {
			e.target.style.display = "none";
			setRipples((state) =>
				state.filter(
					(previousRipple) => previousRipple.key !== currentRipple.key
				)
			);
		};
		return (
			<span
				key={currentRipple.key}
				style={currentRipple.style}
				onAnimationEnd={(e) => handleAnimationEnd(e)}
			/>
		);
	});

	return [showRipple, ripplesArray];
}
