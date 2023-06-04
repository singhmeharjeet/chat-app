import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ShortcutKeysProps {
	keys: string[];
	className?: string;
}

const ShortcutKeys: React.FC<ShortcutKeysProps> = ({
	keys,
	className = "",
}) => {
	return (
		<div className={cn("flex gap-1", className)}>
			{keys.map((key, index) => (
				<kbd
					key={index}
					className="text-lg h-6 rounded-md m-0 text-gray-100/50 flex items-center justify-center uppercase"
				>
					{key}
				</kbd>
			))}
		</div>
	);
};

export default ShortcutKeys;
