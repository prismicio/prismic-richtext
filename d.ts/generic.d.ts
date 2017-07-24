export interface ITree {
    root: INode;
}
export interface INode {
    key: string;
    children: ILeaf[];
}
export interface ILeaf extends INode {
    key: string;
    start: number;
    end: number;
    type: string;
    text?: string;
    raw: any;
    children: ILeaf[];
    contains(node: ILeaf): boolean;
    isOutside(node: ILeaf): boolean;
    addChildren(nodes: ILeaf[]): ILeaf;
    copy(params: ILeaf): ILeaf;
    length(): number;
    add(node: ILeaf): ILeaf;
}
export declare class Tree implements ITree {
    root: INode;
    private constructor();
    static create(nodes: ILeaf[]): ITree;
    static fromRichText(richText: any[]): ITree;
}
export declare class Leaf implements ILeaf {
    key: string;
    start: number;
    end: number;
    type: string;
    text?: string;
    raw: any;
    children: ILeaf[];
    constructor(start: number, end: number, type: string, raw: any, children?: ILeaf[], text?: string);
    contains(node: ILeaf): boolean;
    isOutside(node: ILeaf): boolean;
    copy(params: ILeaf): ILeaf;
    add(node: ILeaf): ILeaf;
    addChildren(nodes: ILeaf[]): ILeaf;
    length(): number;
}
