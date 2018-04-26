import * as R from "ramda";
import uuid from './uuid';
import { RichTextSpan, RichTextBlock } from './richtext';
import { NODE_TYPES, PRIORITIES } from './types';
import {
  Boundaries,
  Node,
  SpanNode,
  TextNode,
  BlockNode,
  ListBlockNode,
  ListItemBlockNode,
  OrderedListBlockNode,
  OrderedListItemBlockNode,
} from './nodes';

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

function sortByPriorities(nodes: SpanNode[]): SpanNode[] {
  return nodes.sort((nodeA: SpanNode, nodeB: SpanNode): number => {
    if (nodeA.isParentOf(nodeB)) {
      return -1;
    } else if (nodeB.isParentOf(nodeA)) {
      return 1;
    } else {
      const result = PRIORITIES[nodeA.type] - PRIORITIES[nodeB.type];
      return (result === 0) ? (nodeA.text.length - nodeB.text.length) : result;
    }
  });
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
  const head = group.elected.setChildren(buildTreeAndFill(text, inner, group.elected.boundaries()));
  return [head].concat(buildTree(text, outer));
}

function groupWith(p: (nodeA: SpanNode, nodeB: SpanNode) => boolean, nodes: SpanNode[]): SpanNode[][] {
  return nodes.reduce<SpanNode[][]>((groups: SpanNode[][], node: SpanNode) => {
    const previousGroup = R.last(groups);
    if (previousGroup) {
      const included = previousGroup.some(nodeGroup => nodeGroup.isParentOf(node));
      if (included) {
        return R.init(groups).concat([previousGroup.concat(node)]);
      } else {
        const previousNode = R.last(previousGroup);
        if (previousNode && p(previousNode, node)) {
          return R.init(groups).concat([previousGroup.concat(node)]);
        } else {
          return groups.concat([[node]]);
        }
      }
    } else {
      return [[node]];
    }
  }, []);
}

function groupNodes(nodes: SpanNode[]): SpanNode[][] {
  const sortByStart = (nodeA: SpanNode, nodeB: SpanNode) => nodeA.start - nodeB.start;
  const sortByEnd = (nodeA: SpanNode, nodeB: SpanNode) => nodeA.end - nodeB.end;
  const sortedNodes = R.sortWith([sortByStart, sortByEnd], nodes);
  return groupWith((nodeA: SpanNode, nodeB: SpanNode) => nodeA.end >= nodeB.start, sortedNodes);
}

function electNode(candidates: SpanNode[]): Group {
  if (candidates.length === 0) {
    throw new Error('Unable to elect node on empty list');    
  } else {
    const [elected, ...others] = sortByPriorities(candidates);
    return { elected, others };
  }
}

function fill(text: string, nodes: SpanNode[], boundaries: Boundaries): SpanNode[] {
  return nodes.reduce((acc: SpanNode[], node, index) => {
    let result: SpanNode[] = [];
    const fillStart = index === 0 && node.start > boundaries.lower;
    const fillEnd = index === nodes.length - 1 && boundaries.upper > node.end;

    if (fillStart) {
      const textNode = new TextNode(boundaries.lower, node.start, text.slice(boundaries.lower, node.start));
      result = result.concat(textNode);
    } else {
      const previousNode = nodes[index - 1];
      if (previousNode) {
        if (node.start > previousNode.end) {
          const subtext = text.slice(previousNode.end, node.start);
          const textNode = new TextNode(previousNode.end, node.start, subtext);
          result = result.concat(textNode);
        }
      }
    }

    result = result.concat(node);

    if (fillEnd) {
      const textNode = new TextNode(node.end, boundaries.upper, text.slice(node.end, boundaries.upper));
      result = result.concat(textNode);
    }

    return acc.concat(result);
  }, []);
}

function buildTreeAndFill(text: string, nodes: SpanNode[], boundaries: Boundaries): SpanNode[] {
  if (nodes.length > 0) {
    const tree = buildTree(text, nodes);
    return fill(text, tree, boundaries);
  } else {
    const subtext = text.slice(boundaries.lower, boundaries.upper);
    return [new TextNode(boundaries.lower, boundaries.upper, subtext)];
  }
}

function buildTree(text: string, nodes: SpanNode[]): SpanNode[] {
  const sortedNodes: SpanNode[] = R.sortBy((node: SpanNode) => node.start, nodes);
  const groups: SpanNode[][] = groupNodes(sortedNodes);
  const postElection: Group[] = groups.map(electNode);
  const tree: SpanNode[] = R.flatten<SpanNode>(postElection.map(group => partitionGroup(text, group)));
  return R.sortBy((node: SpanNode) => node.start, tree);
}

function processTextBlock(block: RichTextBlock): SpanNode[] {
  const nodes = block.spans.map((span) => {
    const text = block.text.slice(span.start, span.end);
    return new SpanNode(span.start, span.end, span.type, text, [], span);
  });
  const boundaries = { lower: 0, upper: block.text.length };
  return buildTreeAndFill(block.text, nodes, boundaries);
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
          const previousBlock = acc[acc.length - 1];
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
