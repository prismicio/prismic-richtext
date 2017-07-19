import uuid from './uuid';
import { IElement, Element, ElementKind, Span } from '@root/elements';

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

export interface SerializedTree<T> {
  root: SerializedNode<T>
}

export interface SerializedNode<T> {
  value: T,
  children: SerializedNode<T>
}

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
  text: string;
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
}

export class Leaf implements ILeaf {
  key: string;
  start: number;
  end: number;
  type: string;
  text: string;
  raw: any;
  children: ILeaf[];

  constructor(start: number, end: number, type: string, text: string, raw: any, children: ILeaf[] = []) {
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
    return (this.start < node.start && this.end < node.start) || (this.start > node.end && this.end > node.end);
  }

  copy(params: ILeaf): ILeaf {
    return new Leaf(params.start || this.start, params.end || this.end, params.type || this.type, params.text || this.text, params.raw || this.raw, params.children || this.children);
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

    return new Leaf(this.start, this.end, this.type, this.text, this.raw, exec(this, this.children, nodes));
  }

  length(): number {
    return this.start - this.end + 1;
  }
}

function subText(text: string, start: number, end: number): string {
  const length = end - start + 1;
  return text.substr(start, length);
}

function customText(text: string, spans: any[]): ILeaf[] {
  const leaves: ILeaf[] = spans.map((span: any) => {
    const subStrLength = span.end - span.start + 1;
    return new Leaf(span.start, span.end, span.type, text.substr(span.start, subStrLength), span, []);
  });
  
  const textLeaf = new Leaf(0, text.length - 1, ElementKind[ElementKind.span], text, {});
  const leavesWithText = [textLeaf].concat(leaves);

  return (function processLeaves(leaves: ILeaf[]): ILeaf[] {
    if(leaves.length === 0) return [];

    const [head, ...tail] = sortByPriorities(leaves);
    const [inLeaves, outLeaves] = splitLeaves(head, tail instanceof Array ? tail : [tail]);

    const inTree = head.addChildren(inLeaves);
    const outTrees = processLeaves(outLeaves);
    
    return [inTree].concat(outTrees);
    
  })(leavesWithText);
}

function sortByPriorities(leaves: ILeaf[]): ILeaf[] {
  return leaves.sort((a: ILeaf, b: ILeaf): number => {
    const diffPriorities = PRIORITIES[a.type] - PRIORITIES[b.type];
    if(diffPriorities === 0) return a.length() - b.length();
    else {
      return b.contains(a) ? 1 : - 1;;
    }
  });
}

function splitLeaves(immutable: ILeaf, leaves: ILeaf[]): [ILeaf[], ILeaf[]] {

  function subNode(toSplit:ILeaf, start: number, end: number): ILeaf {
    const text = subText(toSplit.text, start, end);
    return toSplit.copy({start, end, text} as ILeaf);
  }

  return leaves.reduce<[ILeaf[], ILeaf[]]>(([inLeaves, outLeaves]: [ILeaf[], ILeaf[]], toSplit: ILeaf) => {

    const [inNodes, outNodes] = (() => {
      if(immutable.contains(toSplit)) return [[toSplit], null];
      
      else if (toSplit.isOutside(immutable)) return [null, [toSplit]];

      else if(toSplit.contains(immutable)) {
        const inNode = toSplit.copy({start: immutable.start, end: immutable.end} as ILeaf);
        
        const outLeft = immutable.start > toSplit.start ? subNode(toSplit, toSplit.start, immutable.start - 1) : null;
        const outRight = immutable.end < toSplit.end ? subNode(toSplit, immutable.end + 1, toSplit.end) : null;
        
        const outNodes = [outLeft, outRight].filter(n => n !== null) as ILeaf[];
        return [[inNode], outNodes];
      
      //left part is inside
      } else if(immutable.start <= toSplit.start && immutable.end < toSplit.end) {
        const inNode = subNode(toSplit, toSplit.start, immutable.end);
        const outNode = subNode(toSplit, immutable.end + 1, toSplit.end);
        return [[inNode], [outNode]];

        //right part inside
      } else if(immutable.start > toSplit.start && immutable.end >= toSplit.end) {
        const inNode = subNode(toSplit, immutable.start, toSplit.end);
        const outNode = subNode(toSplit, toSplit.start, immutable.start - 1);
        return [[inNode], [outNode]];
      } else {
        return [[], []];
      }
    })();
    return [inLeaves.concat(inNodes ? inNodes : []), outLeaves.concat(outNodes ? outNodes : [])];
  }, [[], []]);
}

export function asGenericTree(
  richText: any[]
): ITree {

  const leaves: ILeaf[] = richText.map((block: any) => {
    const customItems = customText(block.text, block.spans);
    const sortedCustomItems = customItems.sort((a: ILeaf, b:ILeaf): number => {
      return a.start - b.start;
    });
    const blockStart = 0;
    const blockEnd = block.text.length - 1;
    return new Leaf(blockStart, blockEnd, block.type, subText(block.text, blockStart, blockEnd), {}, sortedCustomItems);
  });

  return Tree.create(leaves);
}

export function asSerializedTree <T>(
  richText: any[],
  serialize: (text: String, content: any) => T,
  linkResolver: (doc: any, isBroken: boolean) => string,
  htmlSerializer: (text: string, content: string) => T
): SerializedTree<T> {

  return {} as SerializedTree<T>;
}