import { RichTextField, RTTextNode } from "./types";

export const asText = (
	richTextField: RichTextField,
	separator = " ",
): string => {
	let result = "";

	for (let i = 0; i < richTextField.length; i++) {
		if ("text" in richTextField[i]) {
			result +=
				(result ? separator : "") + (richTextField[i] as RTTextNode).text;
		}
	}

	return result;
};
