    // structuredText: any[],
    // linkResolver: (doc: any, isBroken: boolean) => string,
    // htmlSerializer: (element: HTMLElement, content: string) => string

import uuid from './uuid';
import { IElement, Element, ElementKind } from '@root/elements';

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

  insert(leaf: ILeaf): void
  addChild(leaf: ILeaf): void
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
  add(leaf: ILeaf): void;
  remove(leaf: ILeaf): void;
  copy(start?: number, end?: number): ILeaf;
  flatWithChildren(): ILeaf[];
}

export class Tree implements ITree {
  root: ILeaf;

  private constructor(root: ILeaf) {
    this.root = root;
  }

  static create(): Tree {
    const root = new Leaf(0, 0, ElementKind[ElementKind.paragraph], {} as IElement, [], true);
    return new Tree(root as ILeaf);
  }

  static subTree(leaf: ILeaf): ITree {
    return new Tree(leaf);
  }

  addChild(leaf: ILeaf): void {
    this.root.add(leaf);
  }

  insert(leaf: ILeaf): ILeaf {
    //must return a node only if it contains fully the children otherwise return null
    function explore(ancestor: ILeaf, toExplore: ILeaf, toProcess: ILeaf): ILeaf | null {
      if(toProcess.isOutside(toExplore)) {
        return null;
      } else if(toExplore.contains(toProcess)) {
        const maybeCandidate = toExplore.children.reduce<ILeaf | null>((maybeLeaf: ILeaf | null, child: ILeaf) => {
          return maybeLeaf || explore(toExplore, child, toProcess);
        }, null);

        if(maybeCandidate) {
          return maybeCandidate;
        } else {
          toExplore.add(toProcess);
          return toExplore;
        };
      } else if(toProcess.contains(toExplore)) {
        ancestor.remove(toExplore);
        toProcess.add(toExplore);
        ancestor.add(toProcess);
        return toProcess;
      } else {
        
        //define which node is immutable and which node need to be split
        const [immutable, toSplit] = (() => {
          const [temp1, temp2] = toExplore.start <= toProcess.start ? [toExplore, toProcess] : [toProcess, toExplore];
          return PRIORITIES[temp1.type] <= PRIORITIES[temp2.type] ? [temp1, temp2] : [temp2, temp1];
        })();
        ancestor.remove(toExplore);
        ancestor.add(immutable);

        toSplit.flatWithChildren().forEach((toSplit: ILeaf) => {
          //process toSplit and its children
          const [inNode, outNode] = (() => {
            if(immutable.start <= toSplit.start) {
              const inNode: ILeaf = toSplit.copy(toSplit.start, immutable.end);
              const outNode: ILeaf = toSplit.copy(immutable.end + 1, toSplit.end);
              return [inNode, outNode];
            } else {
              const outNode: ILeaf = toSplit.copy(toSplit.start, immutable.start - 1);
              const inNode: ILeaf = toSplit.copy(immutable.start, toSplit.end);
              return [inNode, outNode];
            }
          })();
          
          //try to insert outNode inside ancestor children
          const maybeOutNodeParent = ancestor.children.reduce<ILeaf | null>((maybeLeaf: ILeaf | null, child: ILeaf) => {
            return maybeLeaf || explore(ancestor, child, outNode);
          }, null);

          if(!maybeOutNodeParent) ancestor.add(outNode);

          //try to insert inNode inside immutable children
          const maybeInNodeParent = immutable.children.reduce<ILeaf | null>((maybeLeaf: ILeaf | null, child: ILeaf) => {
            return maybeLeaf || explore(immutable, child, inNode);
          }, null);

          if(!maybeInNodeParent) immutable.add(inNode);
        })

        return immutable;
      }
    }
    return explore(this.root, this.root, leaf) || this.root;
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

  add(leaf: ILeaf): void {
    // this.children = this.children.length === 0
    //   ? [leaf]
    //   : this.children.reduce<ILeaf[]>((acc: ILeaf[], child: ILeaf) => {
    //       const toConcat: ILeaf[] = child.start > leaf.start ? [leaf, child] : [child];
    //       return acc.concat(toConcat);
    //     }, []);
    this.children.push(leaf);
    this.children.sort((a: ILeaf, b: ILeaf) => {
      return a.start - b.start;
    });
  }

  remove(leaf: ILeaf): void {
    const toRemoveIndex = this.children.map(c => c.key).indexOf(leaf.key);
    this.children.splice(toRemoveIndex, 1);
  }

  copy(start?: number, end?: number): ILeaf {
    const copied = JSON.parse(JSON.stringify(this));
    return new Leaf(start || copied.start, end || copied.end, copied.type, copied.content, copied.children, copied.isRoot);
  }

  flatWithChildren(): ILeaf[] {
    const children: ILeaf[] = this.children.reduce<ILeaf[]>((acc: ILeaf[], child: ILeaf) => {
      return acc.concat(child.flatWithChildren());
    }, []);
    this.children = [];
    return [this as ILeaf].concat(children);    
  }
}

function insertSpans(tree: ITree, text: string, spans: any[], linkResolver: (doc: any, isBroken: boolean) => string): void {
  spans.forEach((span: any) => {
    const leaf = new Leaf(span.start, span.end, span.type, Element.apply(span, text.substr(span.start, span.end - span.start), linkResolver), []);
    tree.insert(leaf);
  });
}

export function asGenericTree(
  richText: any[],
  linkResolver: (doc: any, isBroken: boolean) => string
): ITree {

  const tree = Tree.create();
  richText.forEach((block: any) => {
    const element: IElement = Element.apply(block, block.text, linkResolver);
    const leaf = new Leaf(0, block.text.length, block.type, element);
    tree.addChild(leaf);
    insertSpans(Tree.subTree(leaf), block.text, block.spans, linkResolver);
  });

  return tree;
}