export interface RichTextSpan {
    start: number;
    end: number;
    type: string;
    text: string;
}
export declare class RichTextBlock {
    type: string;
    text: string;
    spans: RichTextSpan[];
    constructor(type: string, text: string, spans: RichTextSpan[]);
    static isEmbedBlock(type: string): boolean;
    static isImageBlock(type: string): boolean;
    static isList(type: string): boolean;
    static isOrderedList(type: string): boolean;
    static isListItem(type: string): boolean;
    static isOrderedListItem(type: string): boolean;
    static emptyList(): RichTextBlock;
    static emptyOrderedList(): RichTextBlock;
}
