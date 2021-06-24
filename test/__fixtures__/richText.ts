import { RichTextField } from "@prismicio/types";

import enRichTextJSON from "./enRichText.json";
import cnRichTextJSON from "./cnRichText.json";
import koRichTextJSON from "./koRichText.json";
import emojiRichTextJSON from "./emojiRichText.json";

export const richTextFixture = {
	en: enRichTextJSON as RichTextField,
	cn: cnRichTextJSON as RichTextField,
	ko: koRichTextJSON as RichTextField,
	emoji: emojiRichTextJSON as RichTextField,
};
