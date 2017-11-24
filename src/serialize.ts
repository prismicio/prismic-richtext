import Tree from './tree';
import { Node, SpanNode, NodeElement } from './nodes';
import { RichTextBlock } from './richtext';

type Serializer<T> = (type: string, element: NodeElement, text: string | null, children: T[], index: number) => T;

function fromRichText<T>(richText: RichTextBlock[], serialize: Serializer<T>, htmlSerializer?: Serializer<T>): T[] {
  const tree = Tree.fromRichText(richText);
  return tree.children.map((node: Node, index: number) => {
    return serializeNode<T>(node, serialize, index, htmlSerializer);
  });
}

function serializeNode<T>(parentNode: Node, serializer: Serializer<T>, index: number, htmlSerializer?: Serializer<T>): T {

  function step(node: Node, idx: number): T {
    const text = node instanceof SpanNode ? node.text : null;
    const serializedChildren = node.children.reduce<T[]>((acc: T[], node: Node, i: number) => {
      return acc.concat([step(node, i)]);
    }, []);

    const maybeSerialized = htmlSerializer && htmlSerializer(node.type, node.element, text, serializedChildren, idx);
    return maybeSerialized || serializer(node.type, node.element, text, serializedChildren, idx);
  }

  return step(parentNode, index);
}

export default fromRichText;
