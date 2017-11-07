import Engine, { Node, RichTextSpan } from '@root/engine';

type Serializer<T> = (type: string, data: RichTextSpan, text: string, children: T[]) => T;

function fromRichText<T>(richText: any[], serialize: Serializer<T>, htmlSerializer: Serializer<T>): T[] {
  const tree = Engine.fromRichText(richText);
  return tree.children.map((node: Node) => {
    return serializeNode<T>(node, serialize, htmlSerializer);
  });
}

function serializeNode<T>(parentNode: Node, serializer: Serializer<T>, htmlSerializer?: Serializer<T>): T {
  const serialize = htmlSerializer || serializer;

  function step(node: Node): T {
    const serializedChildren = node.children.reduce<T[]>((acc: T[], node: Node) => {
      return acc.concat([step(node)]);
    }, []);

    return serialize(node.type, node.span, node.text, serializedChildren);
  }

  return step(parentNode);
}

export default fromRichText;
