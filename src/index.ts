import { uuid } from "./lib/uuid";
import {
	NodeType,
	RTListGroupItemNode,
	RTNode,
	RTSpanNode,
	RTTextNode,
	Tree,
	TreeNode,
} from "./types";

function textNodeSpansToTreeNodeChildren(
	spans: RTSpanNode[] = [],
	node: RTTextNode,
	parentSpan?: RTSpanNode,
): TreeNode[] {
	if (spans.length < 1) {
		return [createTextTreeNode(node.text)];
	}

	const children: TreeNode[] = [];

	for (let i = 0; i < spans.length; i++) {
		const span = spans[i];
		const spanStart = span.start - (parentSpan?.start || 0);
		const spanEnd = span.end - (parentSpan?.start || 0);

		const childSpans: RTSpanNode[] = [];
		for (let j = 0; j < spans.length; j++) {
			const siblingSpan = spans[j];

			if (
				siblingSpan !== span &&
				siblingSpan.start >= span.start &&
				siblingSpan.end <= span.end
			) {
				childSpans.push(siblingSpan);
				spans.splice(j, 1);
				j = -1;
			}
		}

		if (i === 0 && spanStart > 0) {
			children.push(createTextTreeNode(node.text.slice(0, spanStart)));
		}

		children.push(
			createTreeNode(
				span,
				textNodeSpansToTreeNodeChildren(
					childSpans,
					{
						...node,
						text: node.text.slice(spanStart, spanEnd),
					},
					span,
				),
			),
		);

		if (spanEnd < node.text.length) {
			const nextSpan: RTSpanNode | undefined = spans[i + 1];

			if (nextSpan) {
				const nextSpanStart = nextSpan.start - (parentSpan?.start || 0);
				children.push(
					createTextTreeNode(node.text.slice(spanEnd, nextSpanStart)),
				);
			} else {
				children.push(createTextTreeNode(node.text.slice(spanEnd)));
			}
		}
	}

	return children;
}

function nodeToTreeNode(node: RTNode): TreeNode {
	if ("text" in node) {
		return createTreeNode(
			node,
			textNodeSpansToTreeNodeChildren(node.spans, node),
		);
	}

	if ("listItems" in node) {
		return createTreeNode(node, node.listItems.map(nodeToTreeNode));
	}

	return createTreeNode(node);
}

function prepareNodes(nodes: RTNode[]): RTNode[] {
	const mutNodes = [...nodes];

	for (let i = 0; i < mutNodes.length; i++) {
		const node = mutNodes[i];

		if (
			node.type === NodeType.LIST_ITEM ||
			node.type === NodeType.ORDERED_LIST_ITEM
		) {
			const childItems: RTListGroupItemNode[] = [node as RTListGroupItemNode];

			while (
				mutNodes[i + 1] &&
				(mutNodes[i + 1].type === NodeType.LIST_ITEM ||
					mutNodes[i + 1].type === NodeType.ORDERED_LIST_ITEM)
			) {
				childItems.push(mutNodes[i + 1] as RTListGroupItemNode);
				mutNodes.splice(i, 1);
			}

			mutNodes[i] = {
				type:
					node.type === NodeType.LIST_ITEM
						? NodeType.LIST
						: NodeType.ORDERED_LIST,
				listItems: childItems,
			};
		}
	}

	return mutNodes;
}

export function toTree(nodes: RTNode[]): Tree {
	const preparedNodes = prepareNodes(nodes);

	return {
		key: uuid(),
		children: preparedNodes.map((node) => nodeToTreeNode(node)),
	};
}

function createTreeNode(
	node: RTNode | RTSpanNode,
	children: TreeNode[] = [],
): TreeNode {
	return {
		key: uuid(),
		type: node.type,
		text: "text" in node ? node.text : undefined,
		node,
		children,
	};
}

function createTextTreeNode(text: string): TreeNode {
	return createTreeNode({
		type: NodeType.SPAN,
		text,
	});
}

export function asText(nodes: RTNode[]): string {
	return nodes
		.map((node) => {
			if ("text" in node) {
				return node.text;
			}
		})
		.filter(Boolean)
		.join("\n");
}

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
