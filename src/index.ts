import asText from './astext';
import Tree from './tree';
import Serialize from './serialize';
import { NODE_TYPES } from './types';

module.exports = {
  Elements: NODE_TYPES,
  asText,
  asTree: Tree.fromRichText,
  serialize: Serialize,
};
