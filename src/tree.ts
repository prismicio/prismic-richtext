import * as R from "ramda";
import uuid from "./uuid";

export const NODE_TYPES = {
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  heading4: "heading4",
  heading5: "heading5",
  heading6: "heading6",
  paragraph: "paragraph",
  preformatted: "preformatted",
  strong: "strong",
  em: "em",
  listItem: "list-item",
  oListItem: "o-list-item",
  list: "group-list-item",
  oList: "group-o-list-item",
  image: "image",
  embed: "embed",
  hyperlink: "hyperlink",
  label: "label",
  span: "span",
};

const PRIORITIES = {
  [NODE_TYPES.heading1]: 4,
  [NODE_TYPES.heading2]: 4,
  [NODE_TYPES.heading3]: 4,
  [NODE_TYPES.heading4]: 4,
  [NODE_TYPES.heading5]: 4,
  [NODE_TYPES.heading6]: 4,
  [NODE_TYPES.paragraph]: 3,
  [NODE_TYPES.preformatted]: 5,
  [NODE_TYPES.strong]: 6,
  [NODE_TYPES.em]: 6,
  [NODE_TYPES.oList]: 1,
  [NODE_TYPES.list]: 1,
  [NODE_TYPES.listItem]: 1,
  [NODE_TYPES.oListItem]: 1,
  [NODE_TYPES.image]: 1,
  [NODE_TYPES.embed]: 1,
  [NODE_TYPES.hyperlink]: 3,
  [NODE_TYPES.label]: 4,
  [NODE_TYPES.span]: 7,
};

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

  isParentOf(node: SpanNode): boolean {
    return this.start <= node.start && this.end >= node.end;
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

export interface RichTextSpan {
  start: number;
  end: number;
  type: string;
  text: string;
}

export class RichTextBlock {
  type: string;
  text: string;
  spans: RichTextSpan[];

  constructor(type: string, text: string, spans: RichTextSpan[]) {
    this.type = type;
    this.text = text;
    this.spans = spans;
  }

  static isEmbedBlock(type: string): boolean {
    return type === NODE_TYPES.embed;
  }

  static isImageBlock(type: string): boolean {
    return type === NODE_TYPES.image;
  }

  static isList(type: string): boolean {
    return type === NODE_TYPES.list;
  }

  static isOrderedList(type: string): boolean {
    return type === NODE_TYPES.oList;
  }

  static isListItem(type: string): boolean {
    return type === NODE_TYPES.listItem;
  }

  static isOrderedListItem(type: string): boolean {
    return type === NODE_TYPES.oListItem;
  }

  static emptyList(): RichTextBlock {
    return {
      type: NODE_TYPES.list,
      spans: [],
      text: '',
    };
  }

  static emptyOrderedList(): RichTextBlock {
    return {
      type: NODE_TYPES.oList,
      spans: [],
      text: '',
    };
  }
}

export interface Group {
  elected: SpanNode;
  others: SpanNode[];
}

interface SlicedNode {
  inner: SpanNode;
  outer?: SpanNode;
}

interface PartitionedGroup {
  inner: SpanNode[];
  outer: SpanNode[];
}

function sliceNode(text: string, elected: SpanNode, node: SpanNode): SlicedNode {
  if (node.start < elected.start) {
    return {
      inner: SpanNode.slice(node, elected.start, node.end, text),
      outer: SpanNode.slice(node, node.start, elected.start, text),
    };
  } else if (node.end > elected.end) {
      return {
        inner: SpanNode.slice(node, node.start, elected.end, text),
        outer: SpanNode.slice(node, elected.end, node.end, text),
      };
  } else {
    return {
      inner: node,
    };
  }
}

function partitionGroup(text: string, group: Group): SpanNode[] {
  const partitioned = group.others.reduce<PartitionedGroup>(({ inner: innerAcc, outer: outerAcc }, node) => {
    const slicedNode = sliceNode(text, group.elected, node);
    return {
      inner: innerAcc.concat(slicedNode.inner),
      outer: slicedNode.outer ? outerAcc.concat(slicedNode.outer) : outerAcc,
    };
  }, { inner: [], outer: [] });

  const { inner, outer } = partitioned;
  const head = R.assoc('children', buildTree(text, inner), group.elected);
  return [head].concat(buildTree(text, outer));
}

function groupNodes(nodes: SpanNode[]): SpanNode[][] {
  const sortByStart = (nodeA: SpanNode, nodeB: SpanNode) => nodeA.start - nodeB.start;
  const sortByEnd = (nodeA: SpanNode, nodeB: SpanNode) => nodeA.end - nodeB.end;
  const sortedNodes = R.sortWith([sortByStart, sortByEnd], nodes);
  return R.groupWith((nodeA: SpanNode, nodeB: SpanNode) => nodeA.end >= nodeB.start, sortedNodes);
}

function electNode(candidates: SpanNode[]): Group {
  if (candidates.length === 0) {
    throw new Error('Unable to elect node on empty list');    
  } else {
    const [elected, ...others] = sortByPriorities(candidates);
    return { elected, others };
  }
}

function sortByPriorities(nodes: SpanNode[]): SpanNode[] {
  return nodes.sort((nodeA: SpanNode, nodeB: SpanNode): number => {
    if (nodeB.isParentOf(nodeA)) {
      return 1;
    } else {
      const result = PRIORITIES[nodeA.type] - PRIORITIES[nodeB.type];
      return (result === 0) ? (nodeA.text.length - nodeB.text.length) : result;
    }
  });
}

function fill(text: string, nodes: SpanNode[], lowerBound: number, upperBound: number): SpanNode[] {
  return nodes.reduce((acc: SpanNode[], node, index) => {
    if (index === 0 && node.start > lowerBound) {
      const textNode = new TextNode(lowerBound, node.start, text.slice(lowerBound, node.start));
      return [textNode, node];
    } else if (index === nodes.length - 1 && upperBound > node.end) {
      const textNode = new TextNode(node.end, upperBound, text.slice(node.end, upperBound));
      return acc.concat([node, textNode]);
    } else {
      const previousNode = nodes[index - 1];
      if (previousNode) {
        const textStart = previousNode.end;
        const textEnd = node.start;
        if (textEnd > textStart) {
          const subtext = text.slice(textStart, textEnd);
          const textNode = new TextNode(textStart, textEnd, subtext);
          return acc.concat([textNode, node]);
        }
      }
      return acc.concat(node);
    }
  }, []);
}

function buildTree(text: string, nodes: SpanNode[], maybeLowerBound?: number, maybeUpperBound?: number): SpanNode[] {
  if (nodes.length > 0) {
    const sortedNodes: SpanNode[] = R.sortBy((node: SpanNode) => node.start, nodes);
    const groups: SpanNode[][] = groupNodes(sortedNodes);
    const postElection: Group[] = groups.map(electNode);
    const tree: SpanNode[] = R.flatten(postElection.map(group => partitionGroup(text, group)));
    const sortedTree = R.sortBy((node: SpanNode) => node.start, tree);
    const lowerBound = maybeLowerBound === undefined ? nodes[0].start : maybeLowerBound;
    const upperBound = maybeUpperBound === undefined ? nodes[nodes.length - 1].end : maybeUpperBound;
    return fill(text, sortedTree, lowerBound, upperBound);
  } else {
    return [];
  }
}

function processTextBlock(block: RichTextBlock): SpanNode[] {
  if (block.spans.length > 0) {
    const nodes = block.spans.map((span) => {
      const text = block.text.slice(span.start, span.end);
      return new SpanNode(span.start, span.end, span.type, text, [], span);
    });
    return buildTree(block.text, nodes, 0, block.text.length);
  } else {
    return [new TextNode(0, block.text.length, block.text)];
  }
}

export default class Tree {
  key: string;
  children: Node[];

  static NODE_TYPES = NODE_TYPES;

  static fromRichText(richText: RichTextBlock[]): Tree {
    return {
      key: uuid(),
      children: richText.reduce<Node[]>((acc, block, index) => {
        if (RichTextBlock.isEmbedBlock(block.type) || RichTextBlock.isImageBlock(block.type)) {
          return acc.concat(new BlockNode(block.type, block));
        } else {
          const textNodes = processTextBlock(block);
          const previousBlock = acc[index - 1];
          if (RichTextBlock.isListItem(block.type) && previousBlock && previousBlock instanceof ListBlockNode) {
            const listItem = new ListItemBlockNode(block, textNodes);
            const updatedPreviousBlock = previousBlock.addChild(listItem);
            return R.init(acc).concat(updatedPreviousBlock);
          } else if (RichTextBlock.isOrderedListItem(block.type) && previousBlock && previousBlock instanceof OrderedListBlockNode) {
            const orderedListItem = new OrderedListItemBlockNode(block, textNodes);
            const updatedPreviousBlock = previousBlock.addChild(orderedListItem);
            return R.init(acc).concat(updatedPreviousBlock);
          } else if (RichTextBlock.isListItem(block.type)) {
            const listItem = new ListItemBlockNode(block, textNodes);
            const list = new ListBlockNode(RichTextBlock.emptyList(), [listItem]);
            return acc.concat(list);
          } else if (RichTextBlock.isOrderedListItem(block.type)) {
            const orderedListItem = new OrderedListItemBlockNode(block, textNodes);
            const orderedList = new OrderedListBlockNode(RichTextBlock.emptyOrderedList(), [orderedListItem]);
            return acc.concat(orderedList);
          } else {
            return acc.concat(new BlockNode(block.type, block, textNodes));
          }
        }
      }, []),
    };
  }
}
