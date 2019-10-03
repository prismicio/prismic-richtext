import { RichTextSpan, RichTextBlock } from './richtext';
export declare type NodeElement = RichTextSpan | RichTextBlock;
export declare class Node {
    key: string;
    type: string;
    element: NodeElement;
    children: Node[];
    constructor(type: string, element: NodeElement, children: Node[]);
}
export interface Boundaries {
    lower: number;
    upper: number;
}
export declare class SpanNode extends Node {
    start: number;
    end: number;
    text: string;
    children: SpanNode[];
    constructor(start: number, end: number, type: string, text: string, children: SpanNode[], element: NodeElement);
    boundaries(): Boundaries;
    isParentOf(node: SpanNode): boolean;
    setChildren(children: SpanNode[]): SpanNode;
    static slice(node: SpanNode, start: number, end: number, text: string): SpanNode;
}
export declare class TextNode extends SpanNode {
    constructor(start: number, end: number, text: string);
}
export declare class BlockNode extends Node {
    constructor(type: string, block: RichTextBlock, children?: BlockNode[]);
}
export declare class ListItemBlockNode extends BlockNode {
    constructor(block: RichTextBlock, children: SpanNode[]);
}
export declare class OrderedListItemBlockNode extends BlockNode {
    constructor(block: RichTextBlock, children: SpanNode[]);
}
export declare class OrderedListBlockNode extends BlockNode {
    constructor(block: RichTextBlock, children: BlockNode[]);
    addChild(node: ListItemBlockNode): ListBlockNode;
}
export declare class ListBlockNode extends BlockNode {
    constructor(block: RichTextBlock, children: BlockNode[]);
    addChild(node: ListItemBlockNode): ListBlockNode;
}
