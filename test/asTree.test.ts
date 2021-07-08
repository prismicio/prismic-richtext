import test from "ava";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";

import { asTree } from "../src";

test("does not mutate the provided rich text field", (t) => {
	const richTextFixturesUntouched = createRichTextFixtures();
	const richTextFixturesMaybeMutated = createRichTextFixtures();

	// We run it twice to ensure successive runs does not mutate the value.
	asTree(richTextFixturesMaybeMutated.en);
	asTree(richTextFixturesMaybeMutated.en);

	t.deepEqual(richTextFixturesUntouched.en, richTextFixturesMaybeMutated.en);
});

test("converts a rich text field value to a tree", (t) => {
	const richTextFixtures = createRichTextFixtures();

	t.snapshot(asTree(richTextFixtures.en));
});
