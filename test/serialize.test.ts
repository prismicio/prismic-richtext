import test, { ExecutionContext } from "ava";

import {
	htmlFunctionSerializer,
	htmlMapSerializer,
} from "./__testutils__/htmlSerializer";
import { richTextFixture } from "./__fixtures__/richText";

import { serialize, wrapMapSerializer } from "../src";
import { RichTextField } from "@prismicio/types";

const serializeMacro = (t: ExecutionContext, richText: RichTextField) => {
	const functionSerialization = serialize(richText, htmlFunctionSerializer);
	const mapSerialization = serialize(
		richText,
		wrapMapSerializer(htmlMapSerializer),
	);

	t.snapshot(functionSerialization);
	t.snapshot(mapSerialization);
};

test(
	"serializes a rich text field value using given serializers",
	serializeMacro,
	richTextFixture.en,
);

test(
	"handles Chinese characters correctly",
	serializeMacro,
	richTextFixture.cn,
);

test("handles Korean characters correctly", serializeMacro, richTextFixture.ko);

test(
	"handles emoji characters correctly",
	serializeMacro,
	richTextFixture.emoji,
);
