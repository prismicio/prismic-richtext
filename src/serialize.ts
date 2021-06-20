import { NodeType, RTNode, RTSpanNode, TreeNode } from "./types";
import { toTree } from "./toTree";

export type Serializer<T> = (
	type: NodeType,
	node: RTNode | RTSpanNode,
	text: string | undefined,
	children: T[],
	key: string,
) => T;

export function serialize<T>(nodes: RTNode[], serializer: Serializer<T>): T[] {
	const tree = toTree(nodes);

	return serializeTreeNodes(tree.children, serializer);
}

function serializeTreeNodes<T>(
	nodes: TreeNode[],
	serializer: Serializer<T>,
): T[] {
	return nodes.map((node) => {
		return serializeTreeNode(node, serializer);
	});
}

function serializeTreeNode<T>(node: TreeNode, serializer: Serializer<T>): T {
	return serializer(
		node.type,
		node.node,
		node.text,
		serializeTreeNodes(node.children, serializer),
		node.key,
	);
}
