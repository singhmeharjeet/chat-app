import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";

type Item = any; // Update the type of items here
type Options = any; // Update the type of options here

export function useFuse(
	searchTerm: string,
	items: ReadonlyArray<Item>,
	options: Fuse.IFuseOptions<Options> = {}
): Item[] {
	const fuse = useRef<Fuse<Item> | null>(null);
	const [suggestions, setSuggestions] = useState<Item[]>([]);

	useEffect(() => {
		fuse.current = new Fuse(items, options);
	}, [items, options]);

	useEffect(() => {
		if (fuse.current) {
			const searchResults = fuse.current.search(searchTerm);
			setSuggestions(searchResults.map(({ item }) => item));
		}
	}, [searchTerm]);

	return suggestions;
}
