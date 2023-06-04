"use client";

import { motion } from "framer-motion";
import { FC, useEffect } from "react";
interface Props {
	children: React.ReactNode;
}
const Main: FC<Props> = ({ children }) => {
	useEffect(() => {}, [children]);
	return (
		<>
			<motion.div
				initial={{ translateY: 100, opacity: 0 }}
				animate={{ translateY: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{children}
			</motion.div>
		</>
	);
};
export default Main;
