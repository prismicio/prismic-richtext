import { expect, it } from "vitest";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import { serialize, wrapMapSerializer } from "../src";

it("serializes a rich text field value using a given serializer map", () => {
	const richTextFixtures = createRichTextFixtures();

	const serializer = wrapMapSerializer(htmlMapSerializer);
	const serialization = serialize(richTextFixtures.en, serializer);

	expect(serialization).toMatchSnapshot();
});

it("returns `undefined` when serializer does not handle given tag", () => {
	const richTextFixtures = createRichTextFixtures();

	const serializer = wrapMapSerializer({});
	const serialization = serialize(richTextFixtures.en, serializer);

	expect(serialization.every((element) => element === undefined)).toBe(true);
});
