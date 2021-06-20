import {
	NodeType,
	RTListGroupItemNode,
	RTNode,
	RTSpanNode,
	RTTextNode,
	Tree,
	TreeNode,
} from "./types";

export const uuid = (): string => {
	return (++uuid.i).toString();
};
uuid.i = 0;

export const toTree = (nodes: RTNode[]): Tree => {
	const preparedNodes = prepareNodes(nodes);

	const children: TreeNode[] = [];
	for (let i = 0; i < preparedNodes.length; i++) {
		children.push(nodeToTreeNode(preparedNodes[i]));
	}

	return {
		key: uuid(),
		children,
	};
};

const createTreeNode = (
	node: RTNode | RTSpanNode,
	children: TreeNode[] = [],
): TreeNode => {
	return {
		key: uuid(),
		type: node.type,
		text: "text" in node ? node.text : undefined,
		node,
		children,
	};
};

const createTextTreeNode = (text: string): TreeNode => {
	return createTreeNode({
		type: NodeType.span,
		text,
		spans: [],
	});
};

const prepareNodes = (nodes: RTNode[]): RTNode[] => {
	const mutNodes = nodes.slice(0);

	for (let i = 0; i < mutNodes.length; i++) {
		const node = mutNodes[i];

		if (node.type === NodeType.listItem || node.type === NodeType.oListItem) {
			const items: RTListGroupItemNode[] = [node as RTListGroupItemNode];

			while (mutNodes[i + 1] && mutNodes[i + 1].type === node.type) {
				items.push(mutNodes[i + 1] as RTListGroupItemNode);
				mutNodes.splice(i, 1);
			}

			mutNodes[i] = {
				type: node.type === NodeType.listItem ? NodeType.list : NodeType.oList,
				items,
			};
		}
	}

	return mutNodes;
};

const nodeToTreeNode = (node: RTNode): TreeNode => {
	if ("text" in node) {
		return createTreeNode(
			node,
			textNodeSpansToTreeNodeChildren(node.spans, node),
		);
	}

	if ("items" in node) {
		const children: TreeNode[] = [];
		for (let i = 0; i < node.items.length; i++) {
			children.push(nodeToTreeNode(node.items[i]));
		}

		return createTreeNode(node, children);
	}

	return createTreeNode(node);
};

const textNodeSpansToTreeNodeChildren = (
	spans: RTSpanNode[],
	node: RTTextNode,
	parentSpan?: RTSpanNode,
): TreeNode[] => {
	if (!spans.length) {
		return [createTextTreeNode(node.text)];
	}

	const children: TreeNode[] = [];

	for (let i = 0; i < spans.length; i++) {
		const span = spans[i];
		const parentSpanStart = (parentSpan && parentSpan.start) || 0;
		const spanStart = span.start - parentSpanStart;
		const spanEnd = span.end - parentSpanStart;

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
				j--;
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
			children.push(
				createTextTreeNode(
					node.text.slice(
						spanEnd,
						spans[i + 1] ? spans[i + 1].start - parentSpanStart : undefined,
					),
				),
			);
		}
	}

	return children;
};
