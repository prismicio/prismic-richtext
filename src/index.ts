import { Tree } from '@root/generic';
import Engine from '@root/engine';
import Serialize from '@root/serialize';
import { ElementKindAsObj } from '@root/elements';

module.exports = {
  asText: (richtext) => {
    return richtext.reduce((acc, block) => {
      return `${acc} ${block.text}`;
    }, '\n');
  },
  asTree: Tree.fromRichText,
  asTree1: Engine.fromRichText,
  serialize: Serialize,
  Elements: ElementKindAsObj
}
