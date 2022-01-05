import test from "ava";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import { composeSerializers, wrapMapSerializer, serialize } from "../src";

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

test("undefined serializers are ignored", (t) => {
	const richTextFixtures = createRichTextFixtures();

	const serializer = wrapMapSerializer(htmlMapSerializer);

	t.deepEqual(
		serialize(richTextFixtures.en, composeSerializers(undefined, serializer)),
		serialize(richTextFixtures.en, serializer),
	);
});
