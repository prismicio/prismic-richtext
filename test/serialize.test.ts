import { it, expect } from "vitest";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlFunctionSerializer } from "./__testutils__/htmlFunctionSerializer";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import {
	Element,
	RichTextFunctionSerializer,
	serialize,
	wrapMapSerializer,
} from "../src";

const serializeMacro =
	(richTextKey: keyof ReturnType<typeof createRichTextFixtures>) => () => {
		const richTextFixtures = createRichTextFixtures();
		const richTextFixture = richTextFixtures[richTextKey];

		const functionSerialization = serialize(
			richTextFixture,
			htmlFunctionSerializer,
		);
		const mapSerialization = serialize(
			richTextFixture,
			wrapMapSerializer(htmlMapSerializer),
		);

		expect(functionSerialization).toMatchSnapshot();
		expect(mapSerialization).toMatchSnapshot();
	};

it(
	"serializes a rich text field value using given serializers",
	serializeMacro("en"),
);

it("handles Chinese characters correctly", serializeMacro("cn"));

it("handles Korean characters correctly", serializeMacro("ko"));

it("handles emoji characters correctly", serializeMacro("emoji"));

// See: https://github.com/prismicio/prismic-client/issues/198
it("handles overlapped styling correctly", serializeMacro("overlapped"));

it("omits nullish serialized values from the result", () => {
	const richTextFixtures = createRichTextFixtures();

	// We are expecting only heading1 to be included in the serialized result.
	// Note that we are returning `null` for embed. This will be omitted just like
	// the other `undefined` return values.
	const serializer: RichTextFunctionSerializer<string> = (
		_type,
		node,
		text,
		_children,
		_key,
	) => {
		switch (node.type) {
			case Element.heading1: {
				return `<h1>${text}</h1>`;
			}

			case Element.embed: {
				return null;
			}
		}
	};

	const serialization = serialize(richTextFixtures.en, serializer);

	expect(serialization).toMatchSnapshot();
});
