import { RichText } from "../../src/types";

import enRichTextJSON from "./enRichText.json";
import cnRichTextJSON from "./cnRichText.json";
import koRichTextJSON from "./koRichText.json";
import emojiRichTextJSON from "./emojiRichText.json";

export const richTextFixture = {
	en: enRichTextJSON as RichText,
	cn: cnRichTextJSON as RichText,
	ko: koRichTextJSON as RichText,
	emoji: emojiRichTextJSON as RichText,
};
