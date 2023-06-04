"use client";
import fallback from "@/../public/images/website/user-circle (1).svg";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function ImageWithFallback({
	src,
	alt,
	width,
	height,
	fallBackSrc = fallback,
	...props
}: ImageProps & { fallBackSrc?: string }) {
	const [imageError, setImageError] = useState(false);

	return (
		<div className="relative overflow-hidden border-gray-800">
			<Image
				src={imageError ? fallBackSrc : src}
				alt={alt}
				width={width}
				height={height}
				onError={() => setImageError(true)}
				className={cn(props.className, "")}
				{...props}
			/>
		</div>
	);
}

export default ImageWithFallback;
