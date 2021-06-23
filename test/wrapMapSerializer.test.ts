import test from "ava";

import { htmlMapSerializer } from "./__testutils__/htmlSerializer";
import { richTextFixture } from "./__fixtures__/richText";

import { serialize, wrapMapSerializer } from "../src";

test("serializes a rich text field value using a given serializer map", (t) => {
	const mapSerialization = serialize(
		richTextFixture.en,
		wrapMapSerializer(htmlMapSerializer),
	);
	t.snapshot(mapSerialization);
});

test("returns `null` when serializer does not handle given tag", (t) => {
	const serialization = serialize(richTextFixture.en, wrapMapSerializer({}));

	t.true(serialization.every((i) => i === null));
});
