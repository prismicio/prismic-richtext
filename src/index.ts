import asText from "./astext";
import Tree from "./tree";
import serialize from "./serialize";
import { NODE_TYPES as Elements } from "./types";

const asTree = Tree.fromRichText;

export { asText, asTree, serialize, Elements };
