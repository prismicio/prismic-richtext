import { expectTypeOf, it } from "vitest";

import * as lib from "../src";

it("returns string", () => {
	expectTypeOf(lib.asText).returns.toBeString();
});
