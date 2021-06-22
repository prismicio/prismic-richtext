import test, { ExecutionContext } from "ava";

import { htmlSerializer } from "./__testutils__/htmlSerializer";

import { serialize } from "../src";
import { richTextFixture } from "./__fixtures__/richText";
import { RichTextField } from "../src/types";

const serializeMacro = (t: ExecutionContext, richText: RichTextField) => {
	t.snapshot(serialize(richText, htmlSerializer));
};

test(
	"serializes a rich text field value using a given serializer function",
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
