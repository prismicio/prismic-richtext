import {
	RichTextFunctionSerializer,
	RichTextMapSerializer,
	RichTextReversedNodeType,
} from "./types";

/**
 * Wraps a map serializer into a regular function serializer
 *
 * @remarks
 * This is a low level helper mainly intended to be used by higher level
 * packages Most users aren't expected to this function directly
 * @typeParam SerializerReturnType - Return type of the map serializer
 * @param mapSerializer - Map serializer to wrap
 *
 * @returns A regular function serializer
 */
export const wrapMapSerializer = <
	SerializerReturnType,
	SerializerChildType = SerializerReturnType,
>(
	mapSerializer: RichTextMapSerializer<
		SerializerReturnType,
		SerializerChildType
	>,
): RichTextFunctionSerializer<SerializerReturnType, SerializerChildType> => {
	return (type, node, text, children, key) => {
		const tagSerializer: RichTextMapSerializer<
			SerializerReturnType,
			SerializerChildType
		>[keyof RichTextMapSerializer<SerializerReturnType, SerializerChildType>] =
			mapSerializer[
				(RichTextReversedNodeType[
					type as keyof typeof RichTextReversedNodeType
				] || type) as keyof RichTextMapSerializer<SerializerReturnType>
			];

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
	};
};
