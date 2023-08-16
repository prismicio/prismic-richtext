import { it, expect } from "vitest";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import { composeSerializers, wrapMapSerializer, serialize } from "../src";

it("composes multiple serializers", () => {
	const richTextFixtures = createRichTextFixtures();

	const mapSerializer1 = { ...htmlMapSerializer };
	delete mapSerializer1.heading1;

	const mapSerializer2 = { heading1: htmlMapSerializer.heading1 };

	const serializer = composeSerializers(
		mapSerializer1,
		wrapMapSerializer(mapSerializer2),
	);

	const composedSerialization = serialize(richTextFixtures.en, serializer);

	expect(composedSerialization).toMatchSnapshot();
});

it("ignores undefined serializers", () => {
	const richTextFixtures = createRichTextFixtures();

	const serializer = wrapMapSerializer(htmlMapSerializer);

	expect(
		serialize(richTextFixtures.en, composeSerializers(undefined, serializer)),
	).toStrictEqual(serialize(richTextFixtures.en, serializer));
});

it("composes serializers that do not support all node types", () => {
	const richTextFixtures = createRichTextFixtures();

	const mapSerializer1 = { ...htmlMapSerializer };
	delete mapSerializer1.heading1;
	delete mapSerializer1.heading2;

	const mapSerializer2 = { ...htmlMapSerializer };
	delete mapSerializer2.heading1;

	// This serializer does not handle `heading1` nodes.
	const serializer = composeSerializers(
		wrapMapSerializer(mapSerializer1),
		wrapMapSerializer(mapSerializer2),
	);

	const composedSerialization = serialize(richTextFixtures.en, serializer);

	expect(composedSerialization).toMatchSnapshot();
});
