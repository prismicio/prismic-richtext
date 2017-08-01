import { Tree } from '@root/generic';
import Serialize from '@root/serialize';
import { ElementKindAsObj } from '@root/elements';

module.exports = {
  asText: (richtext) => {
    return richtext.reduce((acc, block) => {
      return `${acc} ${block.text}`;
    }, '\n');
  },
  asTree: Tree.fromRichText,
  serialize: Serialize,
  Elements: ElementKindAsObj
}