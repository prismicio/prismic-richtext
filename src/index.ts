import { Tree } from '@root/generic';
import Serialize from '@root/serialize';
import { ElementKindAsObj } from '@root/elements';

module.exports = {
  asTree: Tree.fromRichText,
  serialize: Serialize,
  Elements: ElementKindAsObj
}