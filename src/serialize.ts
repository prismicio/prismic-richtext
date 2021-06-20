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
	return serializeTreeNodes(toTree(richText).children, serializer);
}

function serializeTreeNodes<T>(
	nodes: TreeNode[],
	serializer: RichTextSerializer<T>,
): T[] {
	const serializedTreeNodes: T[] = [];

	for (let i = 0; i < nodes.length; i++) {
		serializedTreeNodes.push(serializeTreeNode(nodes[i], serializer));
	}

	return serializedTreeNodes;
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
