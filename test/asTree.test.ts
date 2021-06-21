import test from "ava";

import { richTextFixture } from "./__fixtures__/richText";

import { asTree } from "../src";

test("converts a rich text field value to a tree", (t) => {
	t.snapshot(asTree(richTextFixture.en));
});
