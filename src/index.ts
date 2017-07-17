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
    return this._explore(this.root, this.root, leaf) || this.root;
  }

  //must return a node only if it contains fully the children otherwise return null
  _explore(ancestor: ILeaf, toExplore: ILeaf, toProcess: ILeaf): ILeaf | null {
    if(toProcess.isOutside(toExplore)) {
      return null;
    } else if(toExplore.contains(toProcess)) {
      const maybeCandidate = toExplore.children.reduce<ILeaf | null>((maybeLeaf: ILeaf | null, child: ILeaf) => {
        return maybeLeaf || this._explore(toExplore, child, toProcess);
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
      const [immutable, toSplit] = this._defineEligibleNodeToSplit(toExplore, toProcess);
      ancestor.remove(toExplore);
      ancestor.add(immutable);

      //process toSplit + toSplit children because the subTree of ancestor was mutate
      // a smaller node (immutable) replaced toExplore so a child may not fit anymore
      toSplit.flatWithChildren().forEach((toSplit: ILeaf) => {
        this._processNodeToSplit(ancestor, immutable, toSplit);
      });

      return immutable;
    }
  }

      //will return first the node that will not be mutate and then the node to split
  _defineEligibleNodeToSplit(node1: ILeaf, node2: ILeaf): [ILeaf, ILeaf] {
    const [temp1, temp2] = node1.start <= node2.start ? [node1, node2] : [node2, node1];
    return PRIORITIES[temp1.type] <= PRIORITIES[temp2.type] ? [temp1, temp2] : [temp2, temp1];
  }

  _processNodeToSplit(ancestor: ILeaf, immutable: ILeaf, toSplit: ILeaf): void {
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
      return maybeLeaf || this._explore(ancestor, child, outNode);
    }, null);

    if(!maybeOutNodeParent) ancestor.add(outNode);

    //try to insert inNode inside immutable children
    const maybeInNodeParent = immutable.children.reduce<ILeaf | null>((maybeLeaf: ILeaf | null, child: ILeaf) => {
      return maybeLeaf || this._explore(immutable, child, inNode);
    }, null);

    if(!maybeInNodeParent) immutable.add(inNode);
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

function insertCustomText(subtree: ITree, text: string, spans: any[], linkResolver: (doc: any, isBroken: boolean) => string): void {
  spans.forEach((span: any) => {
    const leaf = new Leaf(span.start, span.end, span.type, Element.apply(span, text.substr(span.start, span.end - span.start), linkResolver), []);
    subtree.insert(leaf);
  });
}

function insertBasicText(subtree: ITree, text: string): void {
  const missingBlock = (() => {
    //TODO compute missing intervals
    //this following line is just a demo of what it should looks like.
    return [{start: 0, end: 5, text: "demo text"}];
  })();
  missingBlock.forEach((block: any) => {
    const textLeaf = new Leaf(block.start, block.end, ElementKind[ElementKind.span], new Span({}, block.text));
    subtree.addChild(textLeaf);
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
    const subTree = Tree.subTree(leaf);
    insertCustomText(subTree, block.text, block.spans, linkResolver);
    insertBasicText(subTree, block.text);
  });

  return tree;
}