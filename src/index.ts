import Engine from '@root/engine';
import Serialize from '@root/serialize';
import { ElementKindAsObj } from '@root/elements';

module.exports = {
  asText: (richtext: any) => {
    return richtext.reduce((acc: any, block: any) => {
      return `${acc} ${block.text}`;
    }, '\n');
  },
  asTree: Engine.fromRichText,
  serialize: Serialize,
  Elements: ElementKindAsObj
}
