import asText from "./astext";
import Tree from "./tree";
import Serialize from "./serialize";

module.exports = {
  asText,
  asTree: Tree.fromRichText,
  serialize: Serialize,
  Elements: Tree.NODE_TYPES,
};
