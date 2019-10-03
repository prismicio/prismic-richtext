export declare function init<Element>(arr: Element[]): Element[];
export declare function last<Element>(arr: Element[]): Element | undefined;
export declare function flatten<Element>(arr: Array<Element | Element[]>): Element[];
export declare function sort<Element>(arr: Element[], comp: (a: Element, b: Element) => number): Element[];
