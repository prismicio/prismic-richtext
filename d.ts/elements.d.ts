export declare enum ElementKind {
    heading1 = 0,
    heading2 = 1,
    heading3 = 2,
    heading4 = 3,
    heading5 = 4,
    heading6 = 5,
    paragraph = 6,
    preformatted = 7,
    strong = 8,
    em = 9,
    "list-item" = 10,
    "o-list-item" = 11,
    "group-list-item" = 12,
    "group-o-list-item" = 13,
    image = 14,
    embed = 15,
    hyperlink = 16,
    label = 17,
    span = 18,
}
export declare const ElementKindAsObj: any;
export interface IElement {
    kind: ElementKind;
    value: any;
    content: string;
}
export declare class Heading implements IElement {
    kind: ElementKind;
    value: any;
    level: number;
    content: string;
    constructor(value: any, level: number, content: string);
}
export declare class ListItem implements IElement {
    kind: ElementKind;
    value: any;
    organized: boolean;
    content: string;
    constructor(value: any, organized: boolean, content: string);
}
export declare class List implements IElement {
    kind: ElementKind;
    value: ListItem[];
    organized: boolean;
    content: string;
    constructor(value: ListItem[], organized: boolean);
}
export declare class Paragraph implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare class Preformatted implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare class Strong implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare class Emphasized implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare class Image implements IElement {
    kind: ElementKind;
    url: string;
    value: any;
    content: string;
    linkUrl: string | null;
    constructor(value: any, content: string, linkResolver: (doc: any, isBroken: boolean) => string);
}
export declare class Embed implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare class Link implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    url: string;
    constructor(value: any, content: string, linkResolver: (doc: any, isBroken: boolean) => string);
}
export declare class Label implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare class Span implements IElement {
    kind: ElementKind;
    value: any;
    content: string;
    constructor(value: any, content: string);
}
export declare const Element: {
    containsText(element: any): boolean;
    isList(elem: any): boolean;
    isOrderedList(elem: any): boolean;
    isListItem(elem: any): boolean;
    isOrderedListItem(elem: any): boolean;
    isSpan(elem: any): boolean;
    apply(element: any, content: string, linkResolver: (doc: any, isBroken: boolean) => string): IElement;
};
