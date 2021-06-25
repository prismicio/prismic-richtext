import { RichTextError } from "./RichTextError";
import { RichTextFunctionSerializer } from "./types";

/**
 * Takes an array of serializers and returns a serializer applying
 * provided serializers sequentially until a result is returned
 *
 * @param serializers - Serializers to compose
 *
 * @returns Composed serializer
 *
 * @typeParam SerializerReturnType - Return type of serializers
 *
 * @throws {@link RichTextError} when no values are returned by all provided serializers
 *
 * @remarks
 *
 * This is a low level helper mainly intended to be used by higher level packages
 * Most users aren't expected to this function directly
 */
export const composeSerializers = <SerializerReturnType>(
	...serializers: [
		(
			| RichTextFunctionSerializer<SerializerReturnType>
			| RichTextFunctionSerializer<SerializerReturnType | null>
		),
		...(
			| RichTextFunctionSerializer<SerializerReturnType>
			| RichTextFunctionSerializer<SerializerReturnType | null>
		)[]
	]
) => {
	return (
		...args: Parameters<RichTextFunctionSerializer<SerializerReturnType>>
	): SerializerReturnType => {
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
