import * as v2 from "@prismicio/richtext-v2";
import * as path from "path";
import * as url from "url";
import { LinkType } from "@prismicio/client";
import v1 from "@prismicio/richtext";
import Benchmark from "benchmark";

import * as fs from "fs/promises";

// import * as assert from "assert";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const richTextJSON = JSON.parse(
	await fs.readFile(
		path.resolve(__dirname, "../test/__fixtures__/enRichText.json"),
		"utf8",
	),
);

const htmlSerializer = (_type, node, text, children) => {
	switch (node.type) {
		case v2.Element.heading1: {
			return `<h1>${children.join("")}</h1>`;
		}

		case v2.Element.heading2: {
			return `<h2>${children.join("")}</h2>`;
		}

		case v2.Element.heading3: {
			return `<h3>${children.join("")}</h3>`;
		}

		case v2.Element.heading4: {
			return `<h4>${children.join("")}</h4>`;
		}

		case v2.Element.heading5: {
			return `<h5>${children.join("")}</h5>`;
		}

		case v2.Element.heading6: {
			return `<h6>${children.join("")}</h6>`;
		}

		case v2.Element.paragraph: {
			return `<p>${children.join("")}</p>`;
		}

		case v2.Element.preformatted: {
			return `<pre>${children.join("")}</pre>`;
		}

		case v2.Element.strong: {
			return `<strong>${children.join("")}</strong>`;
		}

		case v2.Element.em: {
			return `<em>${children.join("")}</em>`;
		}

		case v2.Element.list: {
			return `<ul>${children.join("")}</ul>`;
		}

		case v2.Element.oList: {
			return `<ol>${children.join("")}</ol>`;
		}

		case v2.Element.listItem:
		case v2.Element.oListItem: {
			return `<li>${children.join("")}</li>`;
		}

		case v2.Element.image: {
			return `<img src="${node.url}" alt="${node.alt}" />`;
		}

		case v2.Element.embed: {
			return node.oembed.html;
		}

		case v2.Element.hyperlink: {
			switch (node.data.link_type) {
				case LinkType.Web: {
					return `<a href="${node.data.url}" target="${
						node.data.target
					}">${children.join("")}</a>`;
				}

				case LinkType.Document: {
					return `<a href="linkResolver(${node.data.id})">${children.join(
						"",
					)}</a>`;
				}

				case LinkType.Media: {
					return `<a href="${node.data.url}">${children.join("")}</a>`;
				}
			}
		}

		case v2.Element.label: {
			return `<span class="${node.data.label}">${children.join("")}</span>`;
		}

		default: {
			return text ? text.replace("\n", "<br/>") : "";
		}
	}
};

const toTreeSuite = new Benchmark.Suite();
// assert.deepStrictEqual(v1.asTree(richTextJSON), v2.asTree(richTextJSON));

toTreeSuite
	.add("v1#asTree", () => {
		v1.asTree(richTextJSON);
	})
	.add("v2#asTree", () => {
		v2.asTree(richTextJSON);
	})
	.on("cycle", (event) => {
		console.info(String(event.target));
	})
	.on("complete", function () {
		console.info(`Fastest is ${this.filter("fastest").map("name")}`);
	})
	.run();

const asTextSuite = new Benchmark.Suite();
// assert.deepStrictEqual(v1.asText(richTextJSON), v2.asText(richTextJSON));

asTextSuite
	.add("v1#asText", () => {
		v1.asText(richTextJSON);
	})
	.add("v2#asText", () => {
		v2.asText(richTextJSON);
	})
	.on("cycle", (event) => {
		console.info(String(event.target));
	})
	.on("complete", function () {
		console.info(`Fastest is ${this.filter("fastest").map("name")}`);
	})
	.run();

const serializeSuite = new Benchmark.Suite();
// assert.deepStrictEqual(
// 	v1.serialize(richTextJSON, htmlSerializer),
// 	v2.serialize(richTextJSON, htmlSerializer),
// );

serializeSuite
	.add("v1#serialize", () => {
		v1.serialize(richTextJSON, htmlSerializer);
	})
	.add("v2#serialize", () => {
		v2.serialize(richTextJSON, htmlSerializer);
	})
	.on("cycle", (event) => {
		console.info(String(event.target));
	})
	.on("complete", function () {
		console.info(`Fastest is ${this.filter("fastest").map("name")}`);
	})
	.run();
