import {
	RichTextNodeType,
	RTAnyNode,
	RTEmbedNode,
	RTEmNode,
	RTHeading1Node,
	RTHeading2Node,
	RTHeading3Node,
	RTHeading4Node,
	RTHeading5Node,
	RTHeading6Node,
	RTImageNode,
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
} from "@prismicio/types";

// Serializers

/**
 * Serializes a node from a rich text or title field with a function
 *
 * @typeParam ReturnType - Return type of the function serializer
 * @see Templating rich text and title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type RichTextFunctionSerializer<ReturnType, ChildType = ReturnType> = (
	type: (typeof RichTextNodeType)[keyof typeof RichTextNodeType],
	node: RTAnyNode,
	text: string | undefined,
	children: ChildType[],
	key: string,
) => ReturnType | null | undefined;

/**
 * Map serializer's tag function serializer, can be helpful for typing those
 * handlers
 *
 * @typeParam ReturnType - Return type of the tag serializer
 */
export type RichTextMapSerializerFunction<
	ReturnType,
	ChildType = ReturnType,
	Node extends RTAnyNode = RTAnyNode,
	TextType = string | undefined,
> = (payload: {
	type: Node["type"];
	node: Node;
	text: TextType;
	children: ChildType[];
	key: string;
}) => ReturnType | null | undefined;

/**
 * Serializes a node from a rich text or title field with a map
 *
 * @remarks
 * This type of serializer needs to be processed through
 * {@link wrapMapSerializer} before being used with {@link serialize}
 * @typeParam ReturnType - Return type of the map serializer
 * @see Templating rich text and title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type RichTextMapSerializer<ReturnType, ChildType = ReturnType> = {
	heading1?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTHeading1Node,
		undefined
	>;
	heading2?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTHeading2Node,
		undefined
	>;
	heading3?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTHeading3Node,
		undefined
	>;
	heading4?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTHeading4Node,
		undefined
	>;
	heading5?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTHeading5Node,
		undefined
	>;
	heading6?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTHeading6Node,
		undefined
	>;
	paragraph?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTParagraphNode,
		undefined
	>;
	preformatted?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTPreformattedNode,
		undefined
	>;
	strong?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTStrongNode,
		string
	>;
	em?: RichTextMapSerializerFunction<ReturnType, ChildType, RTEmNode, string>;
	listItem?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTListItemNode,
		undefined
	>;
	oListItem?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTOListItemNode,
		undefined
	>;
	list?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTListNode,
		undefined
	>;
	oList?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTOListNode,
		undefined
	>;
	image?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTImageNode,
		undefined
	>;
	embed?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTEmbedNode,
		undefined
	>;
	hyperlink?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTLinkNode,
		string
	>;
	label?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTLabelNode,
		string
	>;
	span?: RichTextMapSerializerFunction<
		ReturnType,
		ChildType,
		RTSpanNode,
		string
	>;
};

// Tree
export interface Tree {
	key: string;
	children: TreeNode[];
}

export interface TreeNode {
	key: string;
	type: (typeof RichTextNodeType)[keyof typeof RichTextNodeType];
	text?: string;
	node: RTAnyNode;
	children: TreeNode[];
}

// Helpers
export const RichTextReversedNodeType = {
	[RichTextNodeType.listItem]: "listItem",
	[RichTextNodeType.oListItem]: "oListItem",
	[RichTextNodeType.list]: "list",
	[RichTextNodeType.oList]: "oList",
} as const;
