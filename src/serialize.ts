import Tree, { Node, SpanNode, NodeElement } from './tree';

type Serializer<T> = (type: string, element: NodeElement, text: string | null, children: T[]) => T;

function fromRichText<T>(richText: any[], serialize: Serializer<T>, htmlSerializer?: Serializer<T>): T[] {
  const tree = Tree.fromRichText(richText);
  return tree.children.map((node: Node) => {
    return serializeNode<T>(node, serialize, htmlSerializer);
  });
}

function serializeNode<T>(parentNode: Node, serializer: Serializer<T>, htmlSerializer?: Serializer<T>): T {
  const serialize = htmlSerializer || serializer;

  function step(node: Node): T {
    const children = node instanceof SpanNode ? node.children : [];
    const text = node instanceof SpanNode ? node.text : null;
    const serializedChildren = children.reduce<T[]>((acc: T[], node: Node) => {
      return acc.concat([step(node)]);
    }, []);
    return serialize(node.type, node.element, text, serializedChildren);
  }

  return step(parentNode);
}

export default fromRichText;
