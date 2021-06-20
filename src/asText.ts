import { RTNode, RTTextNode } from "./types";

export const asText = (nodes: RTNode[], separator = " "): string => {
	let res = "";

	for (let i = 0; i < nodes.length; i++) {
		if ((nodes[i] as RTTextNode).text) {
			res += (i > 0 ? separator : "") + (nodes[i] as RTTextNode).text;
		}
	}

	return res;
};
