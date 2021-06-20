import test from "ava";

import { htmlSerializer } from "./__testutils__/htmlSerializer";
import richTextJSON from "./__fixtures__/richText.json";

import { serialize } from "../src";

test("serializes a rich text field value using a given serializer function", (t) => {
	t.snapshot(serialize(richTextJSON, htmlSerializer));
});
