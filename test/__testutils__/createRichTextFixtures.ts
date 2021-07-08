import { RichTextField } from "@prismicio/types";

import enRichTextJSON from "../__fixtures__/enRichText.json";
import cnRichTextJSON from "../__fixtures__/cnRichText.json";
import koRichTextJSON from "../__fixtures__/koRichText.json";
import emojiRichTextJSON from "../__fixtures__/emojiRichText.json";

const deepCloneJSON = <T>(json: T): T => {
	return JSON.parse(JSON.stringify(json));
};

export const createRichTextFixtures = (): Record<
	"en" | "cn" | "ko" | "emoji",
	RichTextField
> => {
	return {
		en: deepCloneJSON(enRichTextJSON) as RichTextField,
		cn: deepCloneJSON(cnRichTextJSON) as RichTextField,
		ko: deepCloneJSON(koRichTextJSON) as RichTextField,
		emoji: deepCloneJSON(emojiRichTextJSON) as RichTextField,
	};
};
