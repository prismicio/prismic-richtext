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
		type: NodeType.span,
		text,
		spans: [],
	});
}

function prepareNodes(nodes: RTNode[]): RTNode[] {
	const mutNodes = [...nodes];

	for (let i = 0; i < mutNodes.length; i++) {
		const node = mutNodes[i];

		if (node.type === NodeType.listItem || node.type === NodeType.oListItem) {
			const childItems: RTListGroupItemNode[] = [node as RTListGroupItemNode];

			while (
				mutNodes[i + 1] &&
				(mutNodes[i + 1].type === NodeType.listItem ||
					mutNodes[i + 1].type === NodeType.oListItem)
			) {
				childItems.push(mutNodes[i + 1] as RTListGroupItemNode);
				mutNodes.splice(i, 1);
			}

			mutNodes[i] = {
				type: node.type === NodeType.listItem ? NodeType.list : NodeType.oList,
				listItems: childItems,
			};
		}
	}

	return mutNodes;
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

function textNodeSpansToTreeNodeChildren(
	spans: RTSpanNode[],
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
