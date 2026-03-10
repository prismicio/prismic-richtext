import { RichTextFunctionSerializer, RichTextMapSerializer } from "./types";

import { wrapMapSerializer } from "./wrapMapSerializer";

/**
 * Takes an array of serializers and returns a serializer applying provided
 * serializers sequentially until a result is returned
 *
 * @remarks
 * This is a low level helper mainly intended to be used by higher level
 * packages Most users aren't expected to this function directly
 *
 * @typeParam SerializerReturnType - Return type of serializers
 *
 * @param serializers - Serializers to compose
 *
 * @returns Composed serializer
 */
export const composeSerializers = <SerializerReturnType>(
	...serializers: (
		| RichTextMapSerializer<SerializerReturnType>
		| RichTextFunctionSerializer<SerializerReturnType>
		| undefined
	)[]
): RichTextFunctionSerializer<SerializerReturnType> => {
	return (...args) => {
		for (let i = 0; i < serializers.length; i++) {
			let serializer = serializers[i];

			if (serializer) {
				if (typeof serializer === "object") {
					serializer = wrapMapSerializer(serializer);
				}

				const res = serializer(...args);

				if (res != null) {
					return res;
				}
			}
		}
	};
};
