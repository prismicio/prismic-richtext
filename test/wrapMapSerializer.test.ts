import test from "ava";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import { serialize, wrapMapSerializer } from "../src";

test("serializes a rich text field value using a given serializer map", (t) => {
	const richTextFixtures = createRichTextFixtures();

	const serializer = wrapMapSerializer(htmlMapSerializer);
	const serialization = serialize(richTextFixtures.en, serializer);

	t.snapshot(serialization);
});

test("returns `null` when serializer does not handle given tag", (t) => {
	const richTextFixtures = createRichTextFixtures();

	const serializer = wrapMapSerializer({});
	const serialization = serialize(richTextFixtures.en, serializer);

	t.true(serialization.every((element) => element === null));
});
