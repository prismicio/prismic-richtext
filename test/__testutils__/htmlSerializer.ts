import { HyperlinkType, NodeType, RichTextSerializer } from "../../src";

export const htmlSerializer: RichTextSerializer<string> = (
	_type,
	node,
	text,
	children,
) => {
	switch (node.type) {
		case NodeType.HEADING_1: {
			return `<h1>${children.join("")}</h1>`;
		}

		case NodeType.HEADING_2: {
			return `<h2>${children.join("")}</h2>`;
		}

		case NodeType.HEADING_3: {
			return `<h3>${children.join("")}</h3>`;
		}

		case NodeType.HEADING_4: {
			return `<h4>${children.join("")}</h4>`;
		}

		case NodeType.HEADING_5: {
			return `<h5>${children.join("")}</h5>`;
		}

		case NodeType.HEADING_6: {
			return `<h6>${children.join("")}</h6>`;
		}

		case NodeType.PARAGRAPH: {
			return `<p>${children.join("")}</p>`;
		}

		case NodeType.PREFORMATTED: {
			return `<pre>${children.join("")}</pre>`;
		}

		case NodeType.STRONG: {
			return `<strong>${children.join("")}</strong>`;
		}

		case NodeType.EM: {
			return `<em>${children.join("")}</em>`;
		}

		case NodeType.LIST: {
			return `<ul>${children.join("")}</ul>`;
		}

		case NodeType.ORDERED_LIST: {
			return `<ol>${children.join("")}</ol>`;
		}

		case NodeType.LIST_ITEM:
		case NodeType.ORDERED_LIST_ITEM: {
			return `<li>${children.join("")}</li>`;
		}

		case NodeType.IMAGE: {
			return `<img src="${node.url}" alt="${node.alt}" />`;
		}

		case NodeType.EMBED: {
			return node.oembed.html;
		}

		case NodeType.HYPERLINK: {
			switch (node.data.link_type) {
				case HyperlinkType.WEB: {
					return `<a href="${node.data.url}" target="${
						node.data.target
					}">${children.join("")}</a>`;
				}

				case HyperlinkType.DOCUMENT: {
					return `<a href="linkResolver(${node.data.id})">${children.join(
						"",
					)}</a>`;
				}

				case HyperlinkType.MEDIA: {
					return `<a href="${node.data.url}">${children.join("")}</a>`;
				}
			}
		}

		case NodeType.LABEL: {
			return `<span class="${node.data.label}">${children.join("")}</span>`;
		}

		default: {
			return text ? text.replace("\n", "<br/>") : "";
		}
	}
};
