import { NODE_TYPES } from './types';

export interface RichTextSpan {
  start: number;
  end: number;
  type: string;
  text: string;
}

export class RichTextBlock {
  type: string;
  text: string;
  spans: RichTextSpan[];

  constructor(type: string, text: string, spans: RichTextSpan[]) {
    this.type = type;
    this.text = text;
    this.spans = spans;
  }

  static isEmbedBlock(type: string): boolean {
    return type === NODE_TYPES.embed;
  }

  static isImageBlock(type: string): boolean {
    return type === NODE_TYPES.image;
  }

  static isList(type: string): boolean {
    return type === NODE_TYPES.list;
  }

  static isOrderedList(type: string): boolean {
    return type === NODE_TYPES.oList;
  }

  static isListItem(type: string): boolean {
    return type === NODE_TYPES.listItem;
  }

  static isOrderedListItem(type: string): boolean {
    return type === NODE_TYPES.oListItem;
  }

  static emptyList(): RichTextBlock {
    return {
      type: NODE_TYPES.list,
      spans: [],
      text: '',
    };
  }

  static emptyOrderedList(): RichTextBlock {
    return {
      type: NODE_TYPES.oList,
      spans: [],
      text: '',
    };
  }
}
