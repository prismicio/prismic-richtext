import test from "ava";

import { richTextFixture } from "./__fixtures__/richText";

import { asTree } from "../src";

// Keep this test first so that we're sure it's the first one to access the fixture
test("does not mutate the provided rich text field", (t) => {
	const richTextJSON = JSON.stringify(richTextFixture.en);

	asTree(richTextFixture.en);

	t.deepEqual(JSON.parse(richTextJSON), richTextFixture.en);
});

test("converts a rich text field value to a tree", (t) => {
	t.snapshot(asTree(richTextFixture.en));
});
