import { RichTextField } from "@prismicio/types";
import {
	RichTextFunctionSerializer,
	RichTextMapSerializer,
	RichTextReversedNodeType,
	TreeNode,
} from "./types";
import { asTree } from "./asTree";
import { RichTextError } from "./RichTextError";

export const wrapMapSerializer = <T>(
	serializer: RichTextMapSerializer<T>,
): RichTextFunctionSerializer<T | null> => {
	return (type, node, text, children, key) => {
		const tagSerializer: RichTextMapSerializer<T>[keyof RichTextMapSerializer<T>] =
			// @ts-expect-error if not at reversed map then at type itself
			serializer[RichTextReversedNodeType[type] || type];

		if (tagSerializer) {
			return tagSerializer({
				// @ts-expect-error cannot type check here
				type,
				// @ts-expect-error cannot type check here
				node,
				// @ts-expect-error cannot type check here
				text,
				// @ts-expect-error cannot type check here
				children,
				// @ts-expect-error cannot type check here
				key,
			});
		}

		return null;
	};
};

export const composeSerializers = <T>(
	...serializers: [
		RichTextFunctionSerializer<T>,
		...RichTextFunctionSerializer<T>[]
	]
) => {
	return (...args: Parameters<RichTextFunctionSerializer<T>>): T => {
		for (let i = 0; i < serializers.length; i++) {
			const res = serializers[i](...args);

			if (res !== null) {
				return res;
			}
		}

		throw new RichTextError(
			`Rich Text Node of type ${args[0]} does not have a serializer`,
		);
	};
};

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
