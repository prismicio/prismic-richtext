import { NodeElement } from './nodes';
import { RichTextBlock } from './richtext';
declare type Serializer<T> = (type: string, element: NodeElement, text: string | null, children: T[], index: number) => T;
declare function fromRichText<T>(richText: RichTextBlock[], serialize: Serializer<T>, htmlSerializer?: Serializer<T>): T[];
export default fromRichText;
