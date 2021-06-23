import { RichTextError } from "./RichTextError";
import { RichTextFunctionSerializer } from "./types";

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
