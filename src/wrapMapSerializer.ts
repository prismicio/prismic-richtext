import {
	RichTextFunctionSerializer,
	RichTextMapSerializer,
	RichTextReversedNodeType,
} from "./types";

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
