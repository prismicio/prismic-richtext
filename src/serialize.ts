import Tree from './tree';
import { Node, SpanNode, NodeElement } from './nodes';
import { RichTextBlock } from './richtext';

type Serializer<T> = (type: string, element: NodeElement, text: string | null, children: T[]) => T;

function fromRichText<T>(richText: RichTextBlock[], serialize: Serializer<T>, htmlSerializer?: Serializer<T>): T[] {
  const tree = Tree.fromRichText(richText);
  return tree.children.map((node: Node) => {
    return serializeNode<T>(node, serialize, htmlSerializer);
  });
}

function serializeNode<T>(parentNode: Node, serializer: Serializer<T>, htmlSerializer?: Serializer<T>): T {

  function step(node: Node): T {
    const text = node instanceof SpanNode ? node.text : null;
    const serializedChildren = node.children.reduce<T[]>((acc: T[], node: Node) => {
      return acc.concat([step(node)]);
    }, []);

    const maybeSerialized = htmlSerializer && htmlSerializer(node.type, node.element, text, serializedChildren);
    return maybeSerialized || serializer(node.type, node.element, text, serializedChildren);
  }

  return step(parentNode);
}

export default fromRichText;
