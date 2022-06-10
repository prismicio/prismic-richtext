import { it, expect } from "vitest";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";

import { asText } from "../src";

it("returns a string representation of a rich text field value", () => {
	const richTextFixtures = createRichTextFixtures();

	expect(asText(richTextFixtures.en)).toMatchSnapshot();
});

it("allows for custom separator", () => {
	const richTextFixtures = createRichTextFixtures();

	expect(asText(richTextFixtures.en, "SEPARATOR")).toMatchSnapshot();
});
