import uuid from './uuid';
import { NODE_TYPES } from './types';
import { RichTextSpan, RichTextBlock } from './richtext';

export type NodeElement = RichTextSpan | RichTextBlock; 

export class Node {
  key: string;
  type: string;
  element: NodeElement;
  children: Node[];

  constructor(type: string, element: NodeElement, children: Node[]) {
    this.key = uuid();
    this.type = type;
    this.element = element;
    this.children = children;
  }
}

export interface Boundaries {
  lower: number;
  upper: number;
}

export class SpanNode extends Node {
  start: number;
  end: number;
  text: string;
  children: SpanNode[];

  constructor(start: number, end: number, type: string, text: string, children: SpanNode[], element: NodeElement) {
    super(type, element, children);
    this.start = start;
    this.end = end;
    this.text = text;
    this.children = children;   
  }

  boundaries(): Boundaries {
    return {
      lower: this.start,
      upper: this.end,
    };
  }

  isParentOf(node: SpanNode): boolean {
    return this.start <= node.start && this.end >= node.end;
  }

  setChildren(children: SpanNode[]): SpanNode {
    return new SpanNode(this.start, this.end, this.type, this.text, children, this.element);
  }

  static slice(node: SpanNode, start: number, end: number, text: string): SpanNode {
    return new SpanNode(start, end, node.type, text.slice(start, end), node.children, node.element);
  }
}

export class TextNode extends SpanNode {

  constructor(start: number, end: number, text: string) {
    const element: RichTextSpan = {
      type: NODE_TYPES.span,
      start,
      end,
      text,
    };

    super(start, end, NODE_TYPES.span, text, [], element);
  }
}

export class BlockNode extends Node {

  constructor(type: string, block: RichTextBlock, children: BlockNode[] = []) {
    super(type, block, children);
  }
}

export class ListItemBlockNode extends BlockNode {

  constructor(block: RichTextBlock, children: SpanNode[]) {
    super(NODE_TYPES.listItem, block, children);
  }
}

export class OrderedListItemBlockNode extends BlockNode {

  constructor(block: RichTextBlock, children: SpanNode[]) {
    super(NODE_TYPES.oListItem, block, children);
  }
}

export class OrderedListBlockNode extends BlockNode {

  constructor(block: RichTextBlock, children: BlockNode[]) {
    super(NODE_TYPES.oList, block, children);
  }

  addChild(node: ListItemBlockNode): ListBlockNode {
    const children = this.children.concat(node);
    return new OrderedListBlockNode(this.element as RichTextBlock, children);
  }
}

export class ListBlockNode extends BlockNode {

  constructor(block: RichTextBlock, children: BlockNode[]) {
    super(NODE_TYPES.list, block, children);
  }

  addChild(node: ListItemBlockNode): ListBlockNode {
    const children = this.children.concat(node);
    return new ListBlockNode(this.element as RichTextBlock, children);
  }
}
