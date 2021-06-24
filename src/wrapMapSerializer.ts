import {
	RichTextFunctionSerializer,
	RichTextMapSerializer,
	RichTextReversedNodeType,
} from "./types";

/**
 * Wraps a map serializer into a regular function serializer
 *
 * @param mapSerializer - Map serializer to wrap
 *
 * @return A regular function serializer
 *
 * @typeParam SerializerReturnType - Return type of the map serializer
 *
 * @remarks
 *
 * This is a low level helper mainly intended to be used by higher level packages
 * Most users aren't expected to this function directly
 */
export const wrapMapSerializer = <SerializerReturnType>(
	mapSerializer: RichTextMapSerializer<SerializerReturnType>,
): RichTextFunctionSerializer<SerializerReturnType | null> => {
	return (type, node, text, children, key) => {
		const tagSerializer: RichTextMapSerializer<SerializerReturnType>[keyof RichTextMapSerializer<SerializerReturnType>] =
			// @ts-expect-error if not at reversed map then at type itself
			mapSerializer[RichTextReversedNodeType[type] || type];

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
