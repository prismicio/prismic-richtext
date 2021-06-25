import test from "ava";

import { richTextFixture } from "./__fixtures__/richText";

import { asTree } from "../src";

test("does not mutate the provided rich text field", (t) => {
	const richText = richTextFixture.en;

	// We will run `asTree` on `clonedRichText` and compare the object to the
	// original value.
	const originalRichText = JSON.parse(JSON.stringify(richText));
	const clonedRichText = JSON.parse(JSON.stringify(richText));

	asTree(clonedRichText);

	t.deepEqual(originalRichText, clonedRichText);
});

test("converts a rich text field value to a tree", (t) => {
	t.snapshot(asTree(richTextFixture.en));
});
