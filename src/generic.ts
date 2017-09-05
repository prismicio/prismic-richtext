import uuid from './uuid';
import { IElement, Element, ElementKind, ElementKindAsObj, Span } from '@root/elements';

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
  [ElementKind[ElementKind.span]]: 7
};

export interface ITree {
  root: INode;
}

export interface INode {
  key: string;
  children: ILeaf[];
}
export interface ILeaf extends INode {
  key: string;
  start: number;
  end: number;
  type: string;
  text?: string;
  raw: any;
  children: ILeaf[];

  contains(node: ILeaf): boolean;
  isOutside(node: ILeaf): boolean;
  addChildren(nodes: ILeaf[]): ILeaf;
  copy(params: ILeaf): ILeaf;
  length(): number;
  add(node: ILeaf): ILeaf;
}

export class Tree implements ITree {
  root: INode;

  private constructor(root: INode) {
    this.root = root;
  }

  static create(nodes: ILeaf[]): ITree {
    return new Tree({key: uuid(), children: nodes} as INode);
  }

  static fromRichText(
    richText: any[]
  ): ITree {

    const leaves: ILeaf[] = richText.reduce<ILeaf[]>((acc: ILeaf[], block: any): ILeaf[] => {
      if(Element.containsText(block)) {
        const customItems = customText(block.text, block.spans);
        const sortedCustomItems = customItems.sort((a: ILeaf, b:ILeaf): number => {
          return a.start - b.start;
        });
        const blockStart = 0;
        const blockEnd = block.text.length - 1;

        const tail = acc.length > 0 ? acc[acc.length -1] : null;

        if(Element.isListItem(block) && Element.isList(tail)) {
          const safeTail = tail as ILeaf;
          const listItemLeaf = new Leaf(blockStart, blockEnd, block.type, block, sortedCustomItems, subText(block.text, blockStart, blockEnd))
          const children = safeTail.children.concat([listItemLeaf]);
          const listLeaf = safeTail.copy({children: children} as ILeaf);
          return acc.slice(0, acc.length - 1).concat([listLeaf]);

        } else if(Element.isOrderedListItem(block) && Element.isOrderedList(tail)) {
          const safeTail = tail as ILeaf;
          const oListItemLeaf = new Leaf(blockStart, blockEnd, block.type, block, sortedCustomItems, subText(block.text, blockStart, blockEnd))
          const children = safeTail.children.concat([oListItemLeaf]);
          const oListLeaf = safeTail.copy({children: children} as ILeaf);
          return acc.slice(0, acc.length - 1).concat([oListLeaf]);
        
        } else if(Element.isListItem(block)) {
          const listItemLeaf = new Leaf(blockStart, blockEnd, block.type, block, sortedCustomItems, subText(block.text, blockStart, blockEnd))
          const listLeaf = new Leaf(blockStart, blockEnd, ElementKindAsObj.list, {}, [listItemLeaf]);
          return acc.concat([listLeaf]);

        } else if(Element.isOrderedListItem(block)) {
          const oListItemLeaf = new Leaf(blockStart, blockEnd, block.type, block, sortedCustomItems, subText(block.text, blockStart, blockEnd))
          const oListLeaf = new Leaf(blockStart, blockEnd, ElementKindAsObj.oList, {}, [oListItemLeaf]);
          return acc.concat([oListLeaf]);

        } else {
          return acc.concat(new Leaf(blockStart, blockEnd, block.type, block, sortedCustomItems, subText(block.text, blockStart, blockEnd)));
        }

      //specific for image and embed fragment without any text
      } else {
        return acc.concat(new Leaf(0, 0, block.type, block, []));
      }
    }, []);

    return Tree.create(leaves);
  }
}

export class Leaf implements ILeaf {
  key: string;
  start: number;
  end: number;
  type: string;
  text?: string;
  raw: any;
  children: ILeaf[];

  constructor(start: number, end: number, type: string, raw: any, children: ILeaf[] = [], text?: string) {
    this.key = uuid() as string;
    this.start = start;
    this.end = end;
    this.type = type;
    this.text = text;
    this.raw = raw;
    this.children = children;
  }

  contains(node: ILeaf): boolean {
    return this.start <= node.start && this.end >= node.end;
  }

  isOutside(node: ILeaf): boolean {
    return (this.start < node.start && this.end <= node.start) || (this.start >= node.end && this.end > node.end);
  }

  copy(params: ILeaf): ILeaf {
    return new Leaf(params.start || this.start, params.end || this.end, params.type || this.type, params.raw || this.raw, params.children || this.children, params.text || this.text);
  }

  add(node: ILeaf): ILeaf {
    const eligible = this.children.reduce((acc: ILeaf | null, child: ILeaf) => {
      return child.contains(node) ? child.add(node) : null;
    }, null);
    return eligible || this.copy({children: this.children.concat([node])} as ILeaf);
  }

  addChildren(nodes: ILeaf[]): ILeaf {
    
    function exec(parent: ILeaf, children: ILeaf[], nodes: ILeaf[]): ILeaf[] {
      
      return nodes.reduce((accChildren: ILeaf[], node: ILeaf) => {
        
        if(accChildren.length === 0) return accChildren.concat([node]);
        
        else return accChildren.reduce((acc: ILeaf[], child: ILeaf) => {
          if(child.contains(node)) return acc.concat([child.add(node)]);
          else if(node.contains(child)) return acc.concat([node.add(child)])
          else return acc.concat([child, node]);
        }, []);
      }, children);
    }

    return new Leaf(this.start, this.end, this.type, this.raw, exec(this, this.children, nodes), this.text);
  }

  length(): number {
    return this.start - this.end;
  }
}

function subText(text: string = '', start: number, end: number): string {
  const length = end - start;
  return text.substr(start, length);
}

function customText(text: string, spans: any[] = []): ILeaf[] {
  const leaves: ILeaf[] = spans.map((span: any) => {
    return new Leaf(span.start, span.end, span.type, span, [], subText(text, span.start, span.end));
  });

  const textLeaf = new Leaf(0, text.length, ElementKind[ElementKind.span], {}, [], text);
  const leavesWithText = [textLeaf].concat(leaves);

  return (function processLeaves(leaves: ILeaf[]): ILeaf[] {
    if(leaves.length === 0) return [];

    const [head, ...tail] = sortByPriorities(leaves);
    const [inLeaves, outLeaves] = splitLeaves(text, head, tail instanceof Array ? tail : [tail]);
    const inTree = head.addChildren(inLeaves);
    const outTrees = processLeaves(outLeaves);
    
    return [inTree].concat(outTrees);
    
  })(leavesWithText);
}

function sortByPriorities(leaves: ILeaf[]): ILeaf[] {
  return leaves.sort((a: ILeaf, b: ILeaf): number => {
    if(b.contains(a)) {
      return !Element.isSpan(b) ? 1: -1;
    } else {
      const diffPriorities = PRIORITIES[a.type] - PRIORITIES[b.type];
      if(diffPriorities === 0) return a.length() - b.length();
      else return diffPriorities;
    }
  });
}

function splitLeaves(text: string, immutable: ILeaf, leaves: ILeaf[]): [ILeaf[], ILeaf[]] {

  function subNode(toSplit: ILeaf, start: number, end: number): ILeaf {
    const sub = subText(text, start, end);
    return toSplit.copy({start, end, text: sub} as ILeaf);
  }

  return leaves.reduce<[ILeaf[], ILeaf[]]>(([inLeaves, outLeaves]: [ILeaf[], ILeaf[]], toSplit: ILeaf) => {
    const [inNodes, outNodes] = (() => {
      if(immutable.contains(toSplit)) return [[toSplit], null];
      
      else if (toSplit.isOutside(immutable)) return [null, [toSplit]];

      else if(toSplit.contains(immutable)) {
        const inNode = toSplit.copy({start: immutable.start, end: immutable.end, text: immutable.text} as ILeaf);

        const outLeft = immutable.start > toSplit.start ? subNode(toSplit, toSplit.start, immutable.start) : null;
        const outRight = immutable.end < toSplit.end ? subNode(toSplit, immutable.end, toSplit.end) : null;
        
        const outNodes = [outLeft, outRight].filter(n => n !== null) as ILeaf[];
        return [[inNode], outNodes];
      
      //left part is inside
      } else if(immutable.start <= toSplit.start && immutable.end < toSplit.end) {
        const inNode = subNode(toSplit, toSplit.start, immutable.end);
        const outNode = subNode(toSplit, immutable.end, toSplit.end);
        return [[inNode], [outNode]];

        //right part inside
      } else if(immutable.start > toSplit.start && immutable.end >= toSplit.end) {
        const inNode = subNode(toSplit, immutable.start, toSplit.end);
        const outNode = subNode(toSplit, toSplit.start, immutable.start);
        return [[inNode], [outNode]];
      } else {
        return [[], []];
      }
    })();
    return [inLeaves.concat(inNodes ? inNodes : []), outLeaves.concat(outNodes ? outNodes : [])];
  }, [[], []]);
}
