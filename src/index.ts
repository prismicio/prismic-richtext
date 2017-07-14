    // structuredText: any[],
    // linkResolver: (doc: any, isBroken: boolean) => string,
    // htmlSerializer: (element: HTMLElement, content: string) => string

import uuid from './uuid';
import { IElement, Element } from '@root/elements';

export interface ITree {
  root: ILeaf;

  insert(leaf: ILeaf): void
  addChild(leaf: ILeaf): void
}

export interface ILeaf {
  key: string;
  start: number;
  end: number;
  content: IElement;
  children: ILeaf[];
  isRoot: boolean;

  contains(node: ILeaf): boolean;
  add(leaf: ILeaf): void;
  remove(leaf: ILeaf): void;
}

export class Tree implements ITree {
  root: ILeaf;

  private constructor(root: ILeaf) {
    this.root = root;
  }

  static create(): Tree {
    const root = new Leaf(0, 0, {} as IElement, [], true);
    return new Tree(root as ILeaf);
  }

  static subTree(leaf: ILeaf): ITree {
    return new Tree(leaf);
  }

  addChild(leaf: ILeaf): void {
    this.root.add(leaf);
  }

  insert(leaf: ILeaf): ILeaf {
    function explore(ancestor: ILeaf, toExplore: ILeaf, toProcess: ILeaf): ILeaf | null {
      if(toExplore.contains(toProcess)) {
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
        return null;
      } else {
        //split and merge with other children but in the meantime just add node to the ancestor:
        ancestor.add(toProcess);
        return ancestor;
      }
    }
    return explore(this.root, this.root, leaf) || this.root;
  }
}

export class Leaf implements ILeaf {
  key: string;
  start: number;
  end: number;
  content: IElement;
  children: ILeaf[];
  isRoot: boolean;

  constructor(start: number, end: number, content: IElement, children: ILeaf[] = [], isRoot: boolean = false) {
    this.key = uuid() as string;
    this.start = start;
    this.end = end;
    this.content = content;
    this.children = children;
    this.isRoot = isRoot;
  }

  contains(node: ILeaf): boolean {
    return this.isRoot || (this.start <= node.start && this.end >= node.end);
  }

  add(leaf: ILeaf): void {
    this.children.push(leaf);
  }

  remove(leaf: ILeaf): void {
    const toRemoveIndex = this.children.map(c => c.key).indexOf(leaf.key);
    this.children.splice(toRemoveIndex, 1);
  }
}

function insertSpans(tree: ITree, text: string, spans: any[], linkResolver: (doc: any, isBroken: boolean) => string): void {
  spans.forEach((span: any) => {
    const leaf = new Leaf(span.start, span.end, Element.apply(span, text.substr(span.start, span.end - span.start), linkResolver), []);
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
    const leaf = new Leaf(0, block.text.length, element);
    tree.addChild(leaf);
    insertSpans(Tree.subTree(leaf), block.text, block.spans, linkResolver);
  });

  return tree;
}