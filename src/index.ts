import asText from "./astext";
import Tree from "./tree";
import Serialize from "./serialize";
import { NODE_TYPES } from "./types";

module.exports = {
  asText,
  asTree: Tree.fromRichText,
  serialize: Serialize,
  Elements: NODE_TYPES,
};
