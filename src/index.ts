import asText from "./astext";
import Tree from "./tree";
import serialize from "./serialize";
import { NODE_TYPES as Elements } from "./types";

const asTree = Tree.fromRichText;

// Required to support named imports
export { asText, asTree, serialize, Elements };

// Required to support default imports
export default { asText, asTree, serialize, Elements };