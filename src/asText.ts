import { RichTextField } from "./types";

export const asText = (
	richTextField: RichTextField,
	separator = " ",
): string => {
	let res = "";

	richTextField.forEach((node, i) => {
		if ("text" in node) {
			res += (i > 0 ? separator : "") + node.text;
		}
	});

	return res;
};
