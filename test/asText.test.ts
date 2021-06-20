import test from "ava";

import richTextJSON from "./__fixtures__/richText.json";

import { asText } from "../src";

test("returns a string representation of a rich text field value", (t) => {
	t.snapshot(asText(richTextJSON));
});

test("allows for custom separator", (t) => {
	t.snapshot(asText(richTextJSON, "SEPARATOR"));
});
