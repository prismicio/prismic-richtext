import Tree from "./tree";
import { NODE_TYPES } from "./types";

export { default as asText } from "./astext";
export { default as  serialize } from "./serialize";

export const asTree = Tree.fromRichText;
export const Elements = NODE_TYPES;
