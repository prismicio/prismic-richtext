import {
	NodeType,
	ReversedNodeType,
	RichTextField,
	RichTextFunctionSerializer,
	RichTextObjectSerializer,
	RTAnyNode,
	TreeNode,
} from "./types";
import { asTree } from "./asTree";

export const wrapObjectSerializer = <T>(
	serializer: RichTextObjectSerializer<T>,
): RichTextFunctionSerializer<T | undefined> => {
	return (
		type: NodeType,
		node: RTAnyNode,
		text: string | undefined,
		children: (T | undefined)[],
		key: string,
	): T | undefined => {
		const tagSerializer = serializer[ReversedNodeType[type]];

		return tagSerializer
			? tagSerializer({
					// @ts-expect-error things will be fine?
					type,
					// @ts-expect-error things will be fine?
					node,
					// @ts-expect-error things will be fine?
					text,
					// @ts-expect-error things will be fine?
					children,
					// @ts-expect-error things will be fine?
					key,
			  })
			: undefined;
	};
};

export const buildFinalSerializer = <T>(
	defaultSerializer:
		| RichTextFunctionSerializer<T>
		| Required<RichTextObjectSerializer<T>>,
	...serializers: (
		| RichTextFunctionSerializer<T>
		| RichTextObjectSerializer<T>
	)[]
): RichTextFunctionSerializer<T> => {
	const wrappedDefaultSerizlier =
		typeof defaultSerializer === "object"
			? (wrapObjectSerializer<T>(
					defaultSerializer,
			  ) as RichTextFunctionSerializer<T>) // Assumed "as" statement because default object is required
			: defaultSerializer;

	const wrappedSerializers = serializers.map((serializer) =>
		typeof serializer === "object"
			? wrapObjectSerializer<T>(serializer)
			: serializer,
	);

	return (
		type: NodeType,
		node: RTAnyNode,
		text: string | undefined,
		children: T[],
		key: string,
	): T => {
		for (const serializer of wrappedSerializers) {
			const result = serializer(type, node, text, children, key);

			if (typeof result !== "undefined") {
				return result;
			}
		}

		return wrappedDefaultSerizlier(type, node, text, children, key);
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
