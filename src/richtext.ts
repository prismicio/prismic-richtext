    // structuredText: any[],
    // linkResolver: (doc: any, isBroken: boolean) => string,
    // htmlSerializer: (element: HTMLElement, content: string) => string

import { IElement } from '@root/elements';

export interface ITree {
  root: INode;
}

export interface INode extends ILeaf {
  children: ILeaf[];
}

export interface ILeaf {
  content: IElement;
  children: ILeaf[];
}

export class Tree implements ITree {
  root: INode;

  constructor(root: INode) {
    this.root = root;
  }
}

export class Leaf implements ILeaf {
  content: IElement;
  children: ILeaf[];

  constructor(content: IElement, children: ILeaf[] = []) {
    this.content = content;
    this.children = children;
  }
}

function blockskAsNodes(blocks: any): ILeaf[] {
  return blocks.map((block: any) => {
    const element: IElement = Element.apply(block);
    const children = spansAsNodes(block.spans);
    return new Leaf(element, children);
  });
}

function spansAsNodes(spans: any[]): ILeaf[] {
  return spans.map((span: any) => {
    return new Leaf(Element.apply(span), []);
  });
}

function asGenericTree(
  richText: any[],
  linkResolver: (doc: any, isBroken: boolean) => string
): ITree {

  const blockNodes: ILeaf[] = blockskAsNodes(richText);
  const root: INode = { children: blockNodes } as INode;
  const tree: ITree = new Tree(root);
  return tree;
}

export default { asGenericTree };
