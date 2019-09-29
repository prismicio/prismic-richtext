import Tree from './tree';
import { Node, SpanNode, NodeElement } from './nodes';
import { RichTextBlock } from './richtext';

interface ParentNodeProps {
  [p: string]: any;
}

type Serializer<T> = (
  type: string,
  element: NodeElement,
  text: string | null,
  children: T[],
  index: number,
  parentNodeProps: ParentNodeProps
) => T;

function serializeNode<T>(
  parentNode: Node,
  serializer: Serializer<T>,
  index: number,
  htmlSerializer?: Serializer<T>,
  parentNodeProps?: ParentNodeProps
): T {
  function step(node: Node, idx: number): T {
    const text = node instanceof SpanNode ? node.text : null;
    const serializedChildren = node.children.reduce<T[]>((acc: T[], current: Node, i: number) => {
      return acc.concat([step(current, i)]);
    }, []);

    const maybeSerialized =
      htmlSerializer && htmlSerializer(node.type, node.element, text, serializedChildren, idx, parentNodeProps || {});
    return maybeSerialized || serializer(node.type, node.element, text, serializedChildren, idx, parentNodeProps || {});
  }

  return step(parentNode, index);
}

function fromRichText<T>(
  richText: RichTextBlock[],
  serialize: Serializer<T>,
  htmlSerializer?: Serializer<T>,
  parentNodeProps?: ParentNodeProps
): T[] {
  const tree = Tree.fromRichText(richText);
  return tree.children.map((node: Node, index: number) => {
    return serializeNode<T>(node, serialize, index, htmlSerializer, parentNodeProps);
  });
}

export default fromRichText;
