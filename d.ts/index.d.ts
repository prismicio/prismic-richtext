import { IElement } from '@root/elements';
export interface ITree {
    root: ILeaf;
}
export interface ILeaf {
    key: string;
    start: number;
    end: number;
    type: string;
    content: IElement;
    children: ILeaf[];
    isRoot: boolean;
    contains(node: ILeaf): boolean;
    isOutside(node: ILeaf): boolean;
    addChildren(nodes: ILeaf[]): ILeaf;
    copy(params: ILeaf): ILeaf;
    length(): number;
    add(node: ILeaf): ILeaf;
}
export declare class Tree implements ITree {
    root: ILeaf;
    private constructor();
    static create(nodes: ILeaf[]): ITree;
}
export declare class Leaf implements ILeaf {
    key: string;
    start: number;
    end: number;
    type: string;
    content: IElement;
    children: ILeaf[];
    isRoot: boolean;
    constructor(start: number, end: number, type: string, content: IElement, children?: ILeaf[], isRoot?: boolean);
    contains(node: ILeaf): boolean;
    isOutside(node: ILeaf): boolean;
    copy(params: ILeaf): ILeaf;
    add(node: ILeaf): ILeaf;
    addChildren(nodes: ILeaf[]): ILeaf;
    length(): number;
}
export declare function asGenericTree(richText: any[], linkResolver: (doc: any, isBroken: boolean) => string): ITree;
