export const enum NodeType {
	heading1 = "heading1",
	heading2 = "heading2",
	heading3 = "heading3",
	heading4 = "heading4",
	heading5 = "heading5",
	heading6 = "heading6",
	paragraph = "paragraph",
	preformatted = "preformatted",
	string = "strong",
	em = "em",
	listItem = "list-item",
	oListItem = "o-list-item",
	list = "group-list-item",
	oList = "group-o-list-item",
	image = "image",
	embed = "embed",
	hyperlink = "hyperlink",
	label = "label",
	span = "span",
}

export type RichText = RTNode[];
export type RTNode = RTTextNode | RTImageNode | RTEmbedNode | RTListGroupNode;
export type RTSpanNode = RTLabelSpanNode | RTTextSpanNode | RTHyperlinkSpanNode;

interface RTSpanNodeBase {
	start: number;
	end: number;
}

interface RTLabelSpanNode extends RTSpanNodeBase {
	type: NodeType.label;
	data: {
		label: string;
	};
}

interface RTTextSpanNode extends RTSpanNodeBase {
	type: NodeType.em | NodeType.span | NodeType.string;
}

interface RTHyperlinkSpanNode extends RTSpanNodeBase {
	type: NodeType.hyperlink;
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
		| NodeType.heading1
		| NodeType.heading2
		| NodeType.heading3
		| NodeType.heading4
		| NodeType.heading5
		| NodeType.heading6
		| NodeType.paragraph
		| NodeType.em
		| NodeType.listItem
		| NodeType.oListItem
		| NodeType.preformatted
		| NodeType.span
		| NodeType.string;
	text: string;
	spans: RTSpanNode[];
}

interface RTImageNode {
	type: NodeType.image;
	url: string;
	alt: string;
	copyright: string;
	dimensions: {
		width: number;
		height: number;
	};
}

interface RTEmbedNode {
	type: NodeType.embed;
	oembed: Record<string, string | number | null> & {
		html: string;
	};
}

export interface RTListGroupNode {
	type: NodeType.list | NodeType.oList;
	listItems: RTListGroupItemNode[];
}

export interface RTListGroupItemNode extends RTTextNode {
	type: NodeType.listItem | NodeType.oListItem;
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
