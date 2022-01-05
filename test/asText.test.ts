import test from "ava";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";

import { asText } from "../src";

test("returns a string representation of a rich text field value", (t) => {
	const richTextFixtures = createRichTextFixtures();

	t.snapshot(asText(richTextFixtures.en));
});

test("allows for custom separator", (t) => {
	const richTextFixtures = createRichTextFixtures();

	t.snapshot(asText(richTextFixtures.en, "SEPARATOR"));
});
