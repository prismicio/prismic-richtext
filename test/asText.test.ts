import test from "ava";

import { richTextFixture } from "./__fixtures__/richText";

import { asText } from "../src";

test("returns a string representation of a rich text field value", (t) => {
	t.snapshot(asText(richTextFixture.en));
});

test("allows for custom separator", (t) => {
	t.snapshot(asText(richTextFixture.en, "SEPARATOR"));
});
