import test from "ava";

import { RichTextError } from "../src";

test("is a proper error class", (t) => {
	const error = new RichTextError();

	t.true(error instanceof RichTextError);
	t.true(error instanceof Error);
});
