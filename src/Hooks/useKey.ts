import { RefObject, useEffect } from "react";

export function useKey(key: string, ref: RefObject<HTMLElement>): void {
	useEffect(() => {
		function hotkeyPress(e: KeyboardEvent): void {
			if (e.metaKey && e.key == key) {
				e.preventDefault();
				ref.current?.focus();
				return;
			}
		}

		document.addEventListener("keydown", hotkeyPress);
		return () => {
			document.removeEventListener("keydown", hotkeyPress);
		};
	}, [key, ref]);
}
