import { RTNode } from "./types";

export function asText(nodes: RTNode[], separator = " "): string {
	return nodes
		.map((node) => {
			if ("text" in node) {
				return node.text;
			}
		})
		.filter(Boolean)
		.join(separator);
}
