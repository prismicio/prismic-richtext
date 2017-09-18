import { Tree, ITree, ILeaf } from '@root/generic';

function fromRichText<T>(richText: any[], serialize: (type: string, data: any, text: string | null, children: T[] | null) => T, htmlSerializer: (data: any, text: string) => T): T[] {
  const genericTree = Tree.fromRichText(richText);
  const children: T[] = genericTree.root.children.map((leaf: ILeaf) => {
    return serializeNode<T>(leaf, serialize, htmlSerializer);
  })
  return children;
}

function serializeNode<T>(
  node: ILeaf,
  serialize: (type: string, data: any, text: string | null, children: T[] | null) => T,
  htmlSerializer: (data: any, text?: string) => T
): T {

  function exec(node: ILeaf): T {
    const serializedChildren = node.children.reduce<T[]>((acc: T[], node: ILeaf) => {
      return acc.concat([exec(node)]);
    }, []);

    return htmlSerializer && htmlSerializer(node, node.text) ||
      serialize(node.type, node.raw, node.text || null, serializedChildren);
  }
  return exec(node);
}

export default fromRichText;