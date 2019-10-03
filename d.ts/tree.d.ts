import { Node, SpanNode } from "./nodes";
import { RichTextBlock } from "./richtext";
export interface Group {
    elected: SpanNode;
    others: SpanNode[];
}
export default class Tree {
    static fromRichText(richText: RichTextBlock[]): Tree;
    key: string;
    children: Node[];
}
