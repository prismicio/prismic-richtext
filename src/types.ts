import type {
	FilledLinkToDocumentField,
	FilledLinkToMediaField,
	FilledLinkToWebField,
} from "@prismicio/types";

export const enum NodeType {
	heading1 = "heading1",
	heading2 = "heading2",
	heading3 = "heading3",
	heading4 = "heading4",
	heading5 = "heading5",
	heading6 = "heading6",
	paragraph = "paragraph",
	preformatted = "preformatted",
	strong = "strong",
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

export const ReversedNodeType = {
	[NodeType.heading1]: "heading1",
	[NodeType.heading2]: "heading2",
	[NodeType.heading3]: "heading3",
	[NodeType.heading4]: "heading4",
	[NodeType.heading5]: "heading5",
	[NodeType.heading6]: "heading6",
	[NodeType.paragraph]: "paragraph",
	[NodeType.preformatted]: "preformatted",
	[NodeType.strong]: "strong",
	[NodeType.em]: "em",
	[NodeType.listItem]: "listItem",
	[NodeType.oListItem]: "oListItem",
	[NodeType.list]: "list",
	[NodeType.oList]: "oList",
	[NodeType.image]: "image",
	[NodeType.embed]: "embed",
	[NodeType.hyperlink]: "hyperlink",
	[NodeType.label]: "label",
	[NodeType.span]: "span",
} as const;

// Node types

// Text nodes
interface RTTextNodeBase<T extends NodeType> {
	type: T;
	text: string;
	spans: RTInlineNode[];
}

export type RTHeading1Node = RTTextNodeBase<NodeType.heading1>;
export type RTHeading2Node = RTTextNodeBase<NodeType.heading2>;
export type RTHeading3Node = RTTextNodeBase<NodeType.heading3>;
export type RTHeading4Node = RTTextNodeBase<NodeType.heading4>;
export type RTHeading5Node = RTTextNodeBase<NodeType.heading5>;
export type RTHeading6Node = RTTextNodeBase<NodeType.heading6>;

export type RTParagraphNode = RTTextNodeBase<NodeType.paragraph>;
export type RTPreformattedNode = RTTextNodeBase<NodeType.preformatted>;

// TODO: This one is so confusing
export type RTBlockSpanNode = RTTextNodeBase<NodeType.span>;

// Spans nodes
interface RTSpanNodeBase<T extends NodeType> {
	start: number;
	end: number;
	type: T;
}

export type RTStrongNode = RTSpanNodeBase<NodeType.strong>;
export type RTEmNode = RTSpanNodeBase<NodeType.em>;
export interface RTLabelNode extends RTSpanNodeBase<NodeType.label> {
	data: {
		label: string;
	};
}
export interface RTSpanNode extends RTSpanNodeBase<NodeType.span> {
	text: string;
}

// Lists nodes
export type RTListItemNode = RTTextNodeBase<NodeType.listItem>;
export type RTListNode = {
	type: NodeType.list;
	items: RTListItemNode[];
};

export type RTOListItemNode = RTTextNodeBase<NodeType.oListItem>;
export type RTOListNode = {
	type: NodeType.oList;
	items: RTOListItemNode[];
};

// Media nodes
export type RTImageNode = {
	type: NodeType.image;
	url: string;
	alt: string;
	copyright: string | null;
	dimensions: {
		width: number;
		height: number;
	};
};

export type RTEmbedNode = {
	type: NodeType.embed;
	oembed: Record<string, string | number | null> & {
		html: string;
	};
};

export interface RTLinkNode extends RTSpanNodeBase<NodeType.hyperlink> {
	data:
		| FilledLinkToDocumentField
		| FilledLinkToWebField
		| FilledLinkToMediaField;
}

// Serializers
export type RichTextFunctionSerializer<T> = (
	type: NodeType,
	node: RTAnyNode,
	text: string | undefined,
	children: T[],
	key: string,
) => T;

type RTObjectSerializerFunction<
	Node extends { type: string },
	T,
	TextType = string | undefined,
	ChildrenType = T,
> = (payload: {
	type: Node["type"];
	node: Node;
	text: TextType;
	children: ChildrenType[];
	key: string;
}) => T;

export type RichTextObjectSerializer<T> = {
	heading1?: RTObjectSerializerFunction<RTHeading1Node, T, undefined>;
	heading2?: RTObjectSerializerFunction<RTHeading2Node, T, undefined>;
	heading3?: RTObjectSerializerFunction<RTHeading3Node, T, undefined>;
	heading4?: RTObjectSerializerFunction<RTHeading4Node, T, undefined>;
	heading5?: RTObjectSerializerFunction<RTHeading5Node, T, undefined>;
	heading6?: RTObjectSerializerFunction<RTHeading6Node, T, undefined>;
	paragraph?: RTObjectSerializerFunction<RTParagraphNode, T, undefined>;
	preformatted?: RTObjectSerializerFunction<RTPreformattedNode, T, undefined>;
	strong?: RTObjectSerializerFunction<RTStrongNode, T, string>;
	em?: RTObjectSerializerFunction<RTEmNode, T, string>;
	listItem?: RTObjectSerializerFunction<RTListItemNode, T, undefined>;
	oListItem?: RTObjectSerializerFunction<RTOListItemNode, T, undefined>;
	list?: RTObjectSerializerFunction<RTListNode, T, undefined>;
	oList?: RTObjectSerializerFunction<RTOListNode, T, undefined>;
	image?: RTObjectSerializerFunction<RTImageNode, T, undefined, never>;
	embed?: RTObjectSerializerFunction<RTEmbedNode, T, undefined, never>;
	hyperlink?: RTObjectSerializerFunction<RTImageNode, T, string>;
	label?: RTObjectSerializerFunction<RTLabelNode, T, string>;
	span?: RTObjectSerializerFunction<RTSpanNode, T, never>;
};

// Helpers

// TODO: Actually all the above and this kinda needs to be moved to @prismicio/types...
export type RichTextField = RTNode[];

export type RTNode =
	| RTHeading1Node
	| RTHeading2Node
	| RTHeading3Node
	| RTHeading4Node
	| RTHeading5Node
	| RTHeading6Node
	| RTParagraphNode
	| RTPreformattedNode
	| RTListItemNode
	| RTOListItemNode
	| RTImageNode
	| RTEmbedNode;

export type RTAnyNode = RTBlockNode | RTInlineNode | RTBlockSpanNode;

export type RTBlockNode =
	| RTHeading1Node
	| RTHeading2Node
	| RTHeading3Node
	| RTHeading4Node
	| RTHeading5Node
	| RTHeading6Node
	| RTParagraphNode
	| RTPreformattedNode
	| RTListItemNode
	| RTOListItemNode
	| RTListNode
	| RTOListNode
	| RTImageNode
	| RTEmbedNode;

export type RTInlineNode =
	| RTStrongNode
	| RTEmNode
	| RTSpanNode
	| RTLabelNode
	| RTLinkNode;

// Misc
export interface Tree {
	key: string;
	children: TreeNode[];
}

export interface TreeNode {
	key: string;
	type: NodeType;
	text?: string;
	node: RTAnyNode;
	children: TreeNode[];
}
