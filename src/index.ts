import { Tree } from '@root/generic';
import Engine from '@root/engine';
import Serialize from '@root/serialize';
import { ElementKindAsObj } from '@root/elements';

module.exports = {
  asText: (richtext: any) => {
    return richtext.reduce((acc: any, block: any) => {
      return `${acc} ${block.text}`;
    }, '\n');
  },
  asTree: Tree.fromRichText,
  asTree1: Engine.fromRichText,
  serialize: Serialize,
  Elements: ElementKindAsObj
}
