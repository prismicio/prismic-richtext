const R = require('ramda');
import uuid from '@root/uuid';
import { Element, ElementKind } from '@root/elements';

const PRIORITIES = {
  [ElementKind[ElementKind.heading1]]: 4,
  [ElementKind[ElementKind.heading2]]: 4,
  [ElementKind[ElementKind.heading4]]: 4,
  [ElementKind[ElementKind.heading4]]: 4,
  [ElementKind[ElementKind.heading5]]: 4,
  [ElementKind[ElementKind.heading6]]: 4,
  [ElementKind[ElementKind.paragraph]]: 3,
  [ElementKind[ElementKind.preformatted]]: 5,
  [ElementKind[ElementKind.strong]]: 6,
  [ElementKind[ElementKind.em]]: 6,
  [ElementKind[ElementKind["list-item"]]]: 1,
  [ElementKind[ElementKind["o-list-item"]]]: 1,
  [ElementKind[ElementKind["group-list-item"]]]: 1,
  [ElementKind[ElementKind["group-o-list-item"]]]: 1,
  [ElementKind[ElementKind.image]]: 1,
  [ElementKind[ElementKind.embed]]: 1,
  [ElementKind[ElementKind.hyperlink]]: 3,
  [ElementKind[ElementKind.label]]: 4,
  [ElementKind[ElementKind.span]]: 7,
};

export interface Tree {
  key: string;
  children: Node[];
}

export interface Node {
  key: string;
  start: number;
  end: number;
  tag: string;
  text: string;
  children: Node[];
}

class TextNode implements Node {
  key: string;
  start: number;
  end: number;
  tag: string;
  text: string;
  children: Node[];

  constructor(start: number, end: number, text: string) {
    this.key = uuid();
    this.start = start;
    this.end = end;
    this.tag = ElementKind[ElementKind.span];
    this.text = text;
    this.children = [];
  }
}

export interface RichTextSpan {
  start: number;
  end: number;
  type: string;
  text: string;
}

export interface RichTextBlock {
  text: string;
  spans: RichTextSpan[];
}

export interface Group {
  elected: Node;
  others: Node[];
}

interface SlicedNode {
  inner: Node;
  outer?: Node;
}

interface PartitionedGroup {
  inner: Node[];
  outer: Node[];
}

function sliceNode(text: string, elected: Node, node: Node): SlicedNode {
  if (node.start < elected.start) {
    return {
      inner: R.merge(node, {
        key: uuid(),
        start: elected.start,
        text: text.slice(elected.start, node.end),
      }),
      outer: R.merge(node, {
        key: uuid(),
        end : elected.start,
        text: text.slice(node.start, elected.start),
      }),
    };
  } else if (node.end > elected.end) {
      return {
        inner: R.merge(node, {
          key: uuid(),
          end: elected.end,
          text: text.slice(node.start, elected.end),
        }),
        outer: R.merge(node, {
          key: uuid(),
          start: elected.end,
          text: text.slice(elected.end, node.end),
        }),
      };
  } else {
    return {
      inner: node,
    };
  }
}

function partitionGroup(text: string, group: Group): Node[] {
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

function groupNodes(nodes: Node[]): Node[][] {
  const sortByStart = (nodeA: Node, nodeB: Node) => nodeA.start < nodeB.start;
  const sortByEnd = (nodeA: Node, nodeB: Node) => nodeA.end < nodeB.end;
  const sortedNodes = R.sortWith([sortByStart, sortByEnd], nodes);
  return R.groupWith((nodeA, nodeB) => nodeA.end >= nodeB.start, sortedNodes);
}

function electNode(candidates: Node[]): Group {
  if (candidates.length === 0) {
    throw new Error('Unable to elect node on empty list');    
  } else {
    const [elected, ...others] = R.sortBy(node => PRIORITIES[node.tag], candidates);
    return { elected, others };
  }
}

function fill(text: string, nodes: Node[], lowerBound: number, upperBound: number): Node[] {
  return nodes.reduce((acc: Node[], node, index) => {
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

function buildTree(text: string, nodes: Node[], maybeLowerBound?: number, maybeUpperBound?: number): Node[] {
  if (nodes.length > 0) {
    const sortedNodes = R.sortBy(node => node.start, nodes);
    const groups = groupNodes(sortedNodes);
    const postElection = groups.map(electNode);
    const tree = R.flatten(postElection.map(group => partitionGroup(text, group)));
    const sortedTree = R.sortBy(node => node.start, tree);
    const lowerBound = maybeLowerBound === undefined ? nodes[0].start : maybeLowerBound;
    const upperBound = maybeUpperBound === undefined ? nodes[nodes.length - 1].end : maybeUpperBound;
    return fill(text, sortedTree, lowerBound, upperBound);
  } else {
    return [new TextNode(0, text.length, text)];
  }
}

function processTextBlock(block: RichTextBlock): Tree {
  const nodes: Node[] = block.spans.map((span) => {
    return {
      key: uuid(),
      start: span.start,
      end: span.end,
      tag: span.type,
      text: block.text.slice(span.start, span.end),
      children: [],
    };
  });

  return {
    key: uuid(),
    children: buildTree(block.text, nodes, 0, block.text.length),
  };
}

export default {
  fromRichText(richText: RichTextBlock[]): Tree {
    return processTextBlock(richText[0]);
  },
};
