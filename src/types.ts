export const enum NodeType {
	HEADING_1 = "heading1",
	HEADING_2 = "heading2",
	HEADING_3 = "heading3",
	HEADING_4 = "heading4",
	HEADING_5 = "heading5",
	HEADING_6 = "heading6",
	PARAGRAPH = "paragraph",
	PREFORMATTED = "preformatted",
	STRONG = "strong",
	EM = "em",
	LIST_ITEM = "list-item",
	ORDERED_LIST_ITEM = "o-list-item",
	LIST = "group-list-item",
	ORDERED_LIST = "group-o-list-item",
	IMAGE = "image",
	EMBED = "embed",
	HYPERLINK = "hyperlink",
	LABEL = "label",
	SPAN = "span",
}

export type RTNode = RTTextNode | RTImageNode | RTEmbedNode | RTListGroupNode;
export type RTSpanNode = RTLabelSpanNode | RTTextSpanNode | RTHyperlinkSpanNode;

interface RTSpanNodeBase {
	start: number;
	end: number;
}

interface RTLabelSpanNode extends RTSpanNodeBase {
	type: NodeType.LABEL;
	data: {
		label: string;
	};
}

interface RTTextSpanNode extends RTSpanNodeBase {
	type: NodeType.EM | NodeType.SPAN | NodeType.STRONG;
}

interface RTHyperlinkSpanNode extends RTSpanNodeBase {
	type: NodeType.HYPERLINK;
	data: RTHyperlinkData;
}

type RTHyperlinkData =
	| RTHyperlinkDocumentData
	| RTHyperlinkMediaData
	| RTHyperlinkWebData;

export const enum HyperlinkType {
	DOCUMENT = "Document",
	MEDIA = "Media",
	WEB = "Web",
}

interface RTHyperlinkDocumentData {
	link_type: HyperlinkType.DOCUMENT;
	id: string;
	type: string;
	tags: string[];
	slug: string;
	lang: string;
	uid: string | null;
}

type RTHyperlinkMediaData =
	| RTHyperlinkMediaDocumentData
	| RTHyperlinkMediaImageData;

export const enum HyperlinkMediaKind {
	IMAGE = "image",
	DOCUMENT = "document",
}

interface RTHyperlinkMediaDocumentData {
	link_type: HyperlinkType.MEDIA;
	kind: HyperlinkMediaKind.DOCUMENT;
	name: string;
	url: string;
	size: number;
}

interface RTHyperlinkMediaImageData {
	link_type: HyperlinkType.MEDIA;
	kind: HyperlinkMediaKind.IMAGE;
	name: string;
	url: string;
	size: number;
	height: number;
	width: number;
}

interface RTHyperlinkWebData {
	link_type: HyperlinkType.WEB;
	url: string;
	target: string | null;
}

export interface RTTextNode {
	type:
		| NodeType.HEADING_1
		| NodeType.HEADING_2
		| NodeType.HEADING_3
		| NodeType.HEADING_4
		| NodeType.HEADING_5
		| NodeType.HEADING_6
		| NodeType.PARAGRAPH
		| NodeType.EM
		| NodeType.LIST_ITEM
		| NodeType.ORDERED_LIST_ITEM
		| NodeType.PREFORMATTED
		| NodeType.SPAN
		| NodeType.STRONG;
	text: string;
	spans: RTSpanNode[];
}

interface RTImageNode {
	type: NodeType.IMAGE;
	url: string;
	alt: string;
	copyright: string;
	dimensions: {
		width: number;
		height: number;
	};
}

interface RTEmbedNode {
	type: NodeType.EMBED;
	oembed: Record<string, string | number | null> & {
		html: string;
	};
}

export interface RTListGroupNode {
	type: NodeType.LIST | NodeType.ORDERED_LIST;
	listItems: RTListGroupItemNode[];
}

export interface RTListGroupItemNode extends RTTextNode {
	type: NodeType.LIST_ITEM | NodeType.ORDERED_LIST_ITEM;
}

export interface Tree {
	key: string;
	children: TreeNode[];
}

export interface TreeNode {
	key: string;
	type: NodeType;
	text?: string;
	node: RTNode | RTSpanNode;
	children: TreeNode[];
}
