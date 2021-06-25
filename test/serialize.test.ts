import test, { ExecutionContext } from "ava";

import { createRichTextFixtures } from "./__testutils__/createRichTextFixtures";
import { htmlFunctionSerializer } from "./__testutils__/htmlFunctionSerializer";
import { htmlMapSerializer } from "./__testutils__/htmlMapSerializer";

import { serialize, wrapMapSerializer } from "../src";

const serializeMacro = (
	t: ExecutionContext,
	richTextKey: keyof ReturnType<typeof createRichTextFixtures>,
) => {
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

	t.snapshot(functionSerialization);
	t.snapshot(mapSerialization);
};

test(
	"serializes a rich text field value using given serializers",
	serializeMacro,
	"en",
);

test("handles Chinese characters correctly", serializeMacro, "cn");

test("handles Korean characters correctly", serializeMacro, "ko");

test("handles emoji characters correctly", serializeMacro, "emoji");
