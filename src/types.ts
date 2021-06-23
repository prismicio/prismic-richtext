import {
	RichTextNodeType,
	RTBlockNode,
	RTEmbedNode,
	RTEmNode,
	RTHeading1Node,
	RTHeading2Node,
	RTHeading3Node,
	RTHeading4Node,
	RTHeading5Node,
	RTHeading6Node,
	RTImageNode,
	RTInlineNode,
	RTLabelNode,
	RTLinkNode,
	RTListItemNode,
	RTListNode,
	RTOListItemNode,
	RTOListNode,
	RTParagraphNode,
	RTPreformattedNode,
	RTSpanNode,
	RTStrongNode,
	RTTextNodeBase,
} from "@prismicio/types";

// Serializers
export type RichTextFunctionSerializer<T> = (
	type: RichTextNodeType,
	node: RTAnyNode,
	text: string | undefined,
	children: T[],
	key: string,
) => T;

export type RichTextMapSerializerFunction<
	T,
	Node extends { type: RichTextNodeType } = RTBlockNode | RTInlineNode,
	TextType = string | undefined,
	ChildrenType = T,
> = (payload: {
	type: Node["type"];
	node: Node;
	text: TextType;
	children: ChildrenType[];
	key: string;
}) => T;

export type RichTextMapSerializer<T> = {
	heading1?: RichTextMapSerializerFunction<T, RTHeading1Node, undefined>;
	heading2?: RichTextMapSerializerFunction<T, RTHeading2Node, undefined>;
	heading3?: RichTextMapSerializerFunction<T, RTHeading3Node, undefined>;
	heading4?: RichTextMapSerializerFunction<T, RTHeading4Node, undefined>;
	heading5?: RichTextMapSerializerFunction<T, RTHeading5Node, undefined>;
	heading6?: RichTextMapSerializerFunction<T, RTHeading6Node, undefined>;
	paragraph?: RichTextMapSerializerFunction<T, RTParagraphNode, undefined>;
	preformatted?: RichTextMapSerializerFunction<
		T,
		RTPreformattedNode,
		undefined
	>;
	strong?: RichTextMapSerializerFunction<T, RTStrongNode, string>;
	em?: RichTextMapSerializerFunction<T, RTEmNode, string>;
	listItem?: RichTextMapSerializerFunction<T, RTListItemNode, undefined>;
	oListItem?: RichTextMapSerializerFunction<T, RTOListItemNode, undefined>;
	list?: RichTextMapSerializerFunction<T, RTListNode, undefined>;
	oList?: RichTextMapSerializerFunction<T, RTOListNode, undefined>;
	image?: RichTextMapSerializerFunction<T, RTImageNode, undefined, never>;
	embed?: RichTextMapSerializerFunction<T, RTEmbedNode, undefined, never>;
	hyperlink?: RichTextMapSerializerFunction<T, RTLinkNode, string>;
	label?: RichTextMapSerializerFunction<T, RTLabelNode, string>;
	span?: RichTextMapSerializerFunction<T, RTSpanNode, string, never>;
};

// Tree
export interface Tree {
	key: string;
	children: TreeNode[];
}

export interface TreeNode {
	key: string;
	type: RichTextNodeType;
	text?: string;
	node: RTAnyNode;
	children: TreeNode[];
}

// Helpers
export type RTAnyNode = RTBlockNode | RTInlineNode | RTBlockSpanNode;

// Internal node type used when building the tree
export interface RTBlockSpanNode extends RTTextNodeBase {
	type: RichTextNodeType.span;
}

export const RichTextReversedNodeType = {
	[RichTextNodeType.listItem]: "listItem",
	[RichTextNodeType.oListItem]: "oListItem",
	[RichTextNodeType.list]: "list",
	[RichTextNodeType.oList]: "oList",
} as const;
