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

export interface ITree {
  root: ILeaf;
}

export interface ILeaf {
  key: string;
  start: number;
  end: number;
  type: string;
  content: IElement;
  children: ILeaf[];
  isRoot: boolean;

  contains(node: ILeaf): boolean;
  isOutside(node: ILeaf): boolean;
  addChildren(nodes: ILeaf[]): ILeaf;
  copy(params: ILeaf): ILeaf;
  length(): number;
  add(node: ILeaf): ILeaf;
}

export class Tree implements ITree {
  root: ILeaf;

  private constructor(root: ILeaf) {
    this.root = root;
  }

  static create(nodes: ILeaf[]): ITree {
    const root = new Leaf(0, 0, ElementKind[ElementKind.paragraph], {} as IElement, nodes, true);
    return new Tree(root as ILeaf);
  }
}

export class Leaf implements ILeaf {
  key: string;
  start: number;
  end: number;
  type: string;
  content: IElement;
  children: ILeaf[];
  isRoot: boolean;

  constructor(start: number, end: number, type: string, content: IElement, children: ILeaf[] = [], isRoot: boolean = false) {
    this.key = uuid() as string;
    this.start = start;
    this.end = end;
    this.type = type;
    this.content = content;
    this.children = children;
    this.isRoot = isRoot;
  }

  contains(node: ILeaf): boolean {
    return this.isRoot || (this.start <= node.start && this.end >= node.end);
  }

  isOutside(node: ILeaf): boolean {
    return (this.start < node.start && this.end < node.start) || (this.start > node.end && this.end > node.end);
  }

  copy(params: ILeaf): ILeaf {
    return new Leaf(params.start || this.start, params.end || this.end, params.type || this.type, params.content || this.content, params.children || this.children, params.isRoot || this.isRoot);
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

    return new Leaf(this.start, this.end, this.type, this.content, exec(this, this.children, nodes), this.isRoot);
  }

  length(): number {
    return this.start - this.end + 1;
  }
}

function subText(text: string, start: number, end: number): string {
  const length = end - start + 1;
  return text.substr(start, length);
}

function customText(text: string, spans: any[], linkResolver: (doc: any, isBroken: boolean) => string): ILeaf[] {
  const leaves: ILeaf[] = spans.map((span: any) => {
    const subStrLength = span.end - span.start + 1;
    return new Leaf(span.start, span.end, span.type, Element.apply(span, text.substr(span.start, subStrLength), linkResolver), []);
  });

  return (function processLeaves(leaves: ILeaf[]): ILeaf[] {
    if(leaves.length === 0) return [];

    const [head, ...tail] = sortByPriorities(leaves);
    const [inLeaves, outLeaves] = splitLeaves(head, tail instanceof Array ? tail : [tail]);

    const inTree = head.addChildren(inLeaves);
    const outTrees = processLeaves(outLeaves);
    
    return [inTree].concat(outTrees);
    
  })(leaves);
}

function sortByPriorities(leaves: ILeaf[]): ILeaf[] {
  return leaves.sort((a: ILeaf, b: ILeaf): number => {
    const diffPriorities = PRIORITIES[a.type] - PRIORITIES[b.type];
    if(diffPriorities === 0) return a.length() - b.length();
    else return diffPriorities;
  });
}

function splitLeaves(immutable: ILeaf, leaves: ILeaf[]): [ILeaf[], ILeaf[]] {
  return leaves.reduce<[ILeaf[], ILeaf[]]>(([inLeaves, outLeaves]: [ILeaf[], ILeaf[]], toSplit: ILeaf) => {
    const [inNodes, outNodes] = (() => {
      if(immutable.contains(toSplit)) return [[toSplit], null];
      
      else if (toSplit.isOutside(immutable)) return [null, [toSplit]];

      else if(toSplit.contains(immutable)) {
        const inNode = toSplit.copy({start: immutable.start, end: immutable.end} as ILeaf);
        const outNodes = [
          toSplit.copy({start: toSplit.start, end: immutable.start - 1} as ILeaf),
          toSplit.copy({start: immutable.end + 1, end: toSplit.end} as ILeaf)
        ];
        return [[inNode], outNodes];
      }
      
      else if(immutable.start <= toSplit.start) {
        const inNode: ILeaf = toSplit.copy({start: toSplit.start, end: immutable.end} as ILeaf);
        const outNode: ILeaf = toSplit.copy({start: immutable.end + 1, end: toSplit.end} as ILeaf);
        return [[inNode], [outNode]];
      } else {
        const outNode: ILeaf = toSplit.copy({start: toSplit.start, end: immutable.start - 1} as ILeaf);
        const inNode: ILeaf = toSplit.copy({start: immutable.start, end: toSplit.end} as ILeaf);
        return [[inNode], [outNode]];
      }
    })();
    return [inLeaves.concat(inNodes ? inNodes : []), outLeaves.concat(outNodes ? outNodes : [])];
  }, [[], []]);
}

// function basicText(subtree: ITree, fulltext: string): void {

//   interface BasicText {
//     start: number;
//     end: number;
//     text: string;
//   }
//   function BasicText(start: number, end: number, text: string): BasicText {
//     return {start, end, text} as BasicText;
//   }
//   const missingBlocks: BasicText[] = (() => {
//     const childrenLength = subtree.root.children.length;
    
//     if(childrenLength > 0) {
//       const [head, ...tail] = subtree.root.children;
      
//       const first: BasicText[] = (() => {
//         if(head && head.start > 0) {
//           const start = 0;
//           const end = head.start - 1;
//           const text = subText(fulltext, start, end);
//           return [BasicText(start, end, text)];
//         } else {
//           return [];
//         }
//       })();

//       const last: BasicText[] = (() => {
//         if(!tail) return [];
//         const lastElement = tail instanceof Array ? tail[tail.length - 1] : tail;
//         const textEnd = fulltext.length - 1;
//         if(lastElement.end === textEnd) return [];

//         const start = lastElement.end + 1;
//         const end = textEnd;
//         const text = subText(fulltext, start, end);
//         return [BasicText(start, end, text)];

//       })();

//       const inBetween: BasicText[] = (() => {
        
//         function buildIntervalText(previous: ILeaf, current: ILeaf): BasicText | null {
//           const start = previous.end + 1;
//           const end = current.start - 1;
//           const hasValidText = start < end;
//           return hasValidText ? BasicText(start, end, subText(fulltext, start, end)) : null;
//         }

//         const {_, res} = subtree.root.children.reduce<any>((acc: any, current: ILeaf) => {
//           if(!acc.previous) return { previous: current, res: acc.res};
          
//           const basicText: BasicText | null = buildIntervalText(acc.previous, current);
//           const newResult = basicText ? acc.res.concat([basicText]) : acc.res;
//           return { previous: current, res: newResult };

//         }, { previous: null, res: [] });
        
//         return res;
//       })();
//       return first.concat(inBetween).concat(last);
//     } else {
//       const start = 0;
//       const end = fulltext.length - 1;
//       const text = subText(fulltext, start, end);
//       return [{start, end, text}];
//     }

//   })();
  // missingBlocks.forEach((block: BasicText) => {
  //   const textLeaf = new Leaf(block.start, block.end, ElementKind[ElementKind.span], new Span({}, block.text));
  //   subtree.addChild(textLeaf);
  // });
// }

export function asGenericTree(
  richText: any[],
  linkResolver: (doc: any, isBroken: boolean) => string
): ITree {

  const leaves: ILeaf[] = richText.map((block: any) => {
    const element: IElement = Element.apply(block, block.text, linkResolver);
    const customItems = customText(block.text, block.spans, linkResolver);
    return new Leaf(0, block.text.length - 1, block.type, element, customItems);
  });

  return Tree.create(leaves);
}