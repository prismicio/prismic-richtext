import { NodeType, RichText, RTNode, RTSpanNode, TreeNode } from "./types";
import { toTree } from "./toTree";

export type RichTextSerializer<T> = (
	type: NodeType,
	node: RTNode | RTSpanNode,
	text: string | undefined,
	children: T[],
	key: string,
) => T;

export function serialize<T>(
	richText: RichText,
	serializer: RichTextSerializer<T>,
): T[] {
	const tree = toTree(richText);

	return serializeTreeNodes(tree.children, serializer);
}

function serializeTreeNodes<T>(
	nodes: TreeNode[],
	serializer: RichTextSerializer<T>,
): T[] {
	return nodes.map((node) => {
		return serializeTreeNode(node, serializer);
	});
}

function serializeTreeNode<T>(
	node: TreeNode,
	serializer: RichTextSerializer<T>,
): T {
	return serializer(
		node.type,
		node.node,
		node.text,
		serializeTreeNodes(node.children, serializer),
		node.key,
	);
}
