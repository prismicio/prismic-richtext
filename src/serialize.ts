import { RichTextField } from "@prismicio/types";
import { RichTextFunctionSerializer, TreeNode } from "./types";
import { asTree } from "./asTree";

export const serialize = <T>(
	richTextField: RichTextField,
	serializer: RichTextFunctionSerializer<T>,
): T[] => {
	return serializeTreeNodes(asTree(richTextField).children, serializer);
};

const serializeTreeNodes = <T>(
	nodes: TreeNode[],
	serializer: RichTextFunctionSerializer<T>,
): T[] => {
	const serializedTreeNodes: T[] = [];

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];

		serializedTreeNodes.push(
			serializer(
				node.type,
				node.node,
				node.text,
				serializeTreeNodes(node.children, serializer),
				node.key,
			),
		);
	}

	return serializedTreeNodes;
};
