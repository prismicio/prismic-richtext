import Tree from "./tree";
import Serialize from "./serialize";

module.exports = {
  asText: (richtext: any) => {
    return richtext.reduce((acc: any, block: any) => {
      return `${acc} ${block.text}`;
    }, '\n');
  },
  asTree: Tree.fromRichText,
  serialize: Serialize,
  Elements: Tree.NODE_TYPES,
};
