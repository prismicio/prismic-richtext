import test from "ava";

import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";
import { richTextFixture } from "./__fixtures__/richText";

import { serialize, wrapMapSerializer } from "../src";

test("serializes a rich text field value using a given serializer map", (t) => {
	const serializer = wrapMapSerializer(htmlMapSerializer);
	const serialization = serialize(richTextFixture.en, serializer);

	t.snapshot(serialization);
});

test("returns `null` when serializer does not handle given tag", (t) => {
	const serializer = wrapMapSerializer({});
	const serialization = serialize(richTextFixture.en, serializer);

	t.true(serialization.every((element) => element === null));
});
