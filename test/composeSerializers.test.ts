import test from "ava";

import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";
import { richTextFixture } from "./__fixtures__/richText";

import {
	RichTextError,
	composeSerializers,
	wrapMapSerializer,
	serialize,
} from "../src";

test("composes multiple serializers", (t) => {
	const mapSerializer1 = { ...htmlMapSerializer };
	delete mapSerializer1.heading1;

	const mapSerializer2 = { heading1: htmlMapSerializer.heading1 };

	const serializer = composeSerializers(
		wrapMapSerializer(mapSerializer1),
		wrapMapSerializer(mapSerializer2),
	);

	const composedSerialization = serialize(richTextFixture.en, serializer);

	t.snapshot(composedSerialization);
});

test("throws when no serializer is available for a given node", (t) => {
	t.throws(
		() => {
			const serializer = composeSerializers(wrapMapSerializer({}));

			serialize(richTextFixture.en, serializer);
		},
		{ instanceOf: RichTextError },
	);

	t.throws(
		() => {
			const mapSerializer = { ...htmlMapSerializer };
			delete mapSerializer.heading1;

			const serializer = composeSerializers(wrapMapSerializer(mapSerializer));

			serialize(richTextFixture.en, serializer);
		},
		{ instanceOf: RichTextError },
	);
});
