import test from "ava";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import {
	RichTextError,
	composeSerializers,
	wrapMapSerializer,
	serialize,
} from "../src";

test("composes multiple serializers", (t) => {
	const richTextFixtures = createRichTextFixtures();

	const mapSerializer1 = { ...htmlMapSerializer };
	delete mapSerializer1.heading1;

	const mapSerializer2 = { heading1: htmlMapSerializer.heading1 };

	const serializer = composeSerializers(
		wrapMapSerializer(mapSerializer1),
		wrapMapSerializer(mapSerializer2),
	);

	const composedSerialization = serialize(richTextFixtures.en, serializer);

	t.snapshot(composedSerialization);
});

test("throws when no serializer is available for a given node", (t) => {
	const richTextFixtures = createRichTextFixtures();

	t.throws(
		() => {
			const serializer = composeSerializers(wrapMapSerializer({}));

			serialize(richTextFixtures.en, serializer);
		},
		{ instanceOf: RichTextError },
	);

	t.throws(
		() => {
			const mapSerializer = { ...htmlMapSerializer };
			delete mapSerializer.heading1;

			const serializer = composeSerializers(wrapMapSerializer(mapSerializer));

			serialize(richTextFixtures.en, serializer);
		},
		{ instanceOf: RichTextError },
	);
});
