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

export type RTMapSerializerFunction<
	Node extends { type: RichTextNodeType },
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

export type RichTextMapSerializer<T> = {
	heading1?: RTMapSerializerFunction<RTHeading1Node, T, undefined>;
	heading2?: RTMapSerializerFunction<RTHeading2Node, T, undefined>;
	heading3?: RTMapSerializerFunction<RTHeading3Node, T, undefined>;
	heading4?: RTMapSerializerFunction<RTHeading4Node, T, undefined>;
	heading5?: RTMapSerializerFunction<RTHeading5Node, T, undefined>;
	heading6?: RTMapSerializerFunction<RTHeading6Node, T, undefined>;
	paragraph?: RTMapSerializerFunction<RTParagraphNode, T, undefined>;
	preformatted?: RTMapSerializerFunction<RTPreformattedNode, T, undefined>;
	strong?: RTMapSerializerFunction<RTStrongNode, T, string>;
	em?: RTMapSerializerFunction<RTEmNode, T, string>;
	listItem?: RTMapSerializerFunction<RTListItemNode, T, undefined>;
	oListItem?: RTMapSerializerFunction<RTOListItemNode, T, undefined>;
	list?: RTMapSerializerFunction<RTListNode, T, undefined>;
	oList?: RTMapSerializerFunction<RTOListNode, T, undefined>;
	image?: RTMapSerializerFunction<RTImageNode, T, undefined, never>;
	embed?: RTMapSerializerFunction<RTEmbedNode, T, undefined, never>;
	hyperlink?: RTMapSerializerFunction<RTLinkNode, T, string>;
	label?: RTMapSerializerFunction<RTLabelNode, T, string>;
	span?: RTMapSerializerFunction<RTSpanNode, T, string, never>;
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
