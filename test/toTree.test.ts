import test from "ava";

import richTextJSON from "./__fixtures__/richText.json";

import { toTree } from "../src";

test("converts a rich text field value to a tree", (t) => {
	t.snapshot(toTree(richTextJSON));
});
