import { IElement } from '@root/elements';
export interface ITree {
    root: ILeaf;
    insert(leaf: ILeaf): void;
    addChild(leaf: ILeaf): void;
}
export interface ILeaf {
    key: string;
    start: number;
    end: number;
    content: IElement;
    children: ILeaf[];
    isRoot: boolean;
    contains(node: ILeaf): boolean;
    add(leaf: ILeaf): void;
    remove(leaf: ILeaf): void;
}
export declare class Tree implements ITree {
    root: ILeaf;
    private constructor();
    static create(): Tree;
    static subTree(leaf: ILeaf): ITree;
    addChild(leaf: ILeaf): void;
    insert(leaf: ILeaf): ILeaf;
}
export declare class Leaf implements ILeaf {
    key: string;
    start: number;
    end: number;
    content: IElement;
    children: ILeaf[];
    isRoot: boolean;
    constructor(start: number, end: number, content: IElement, children?: ILeaf[], isRoot?: boolean);
    contains(node: ILeaf): boolean;
    add(leaf: ILeaf): void;
    remove(leaf: ILeaf): void;
}
export declare function asGenericTree(richText: any[], linkResolver: (doc: any, isBroken: boolean) => string): ITree;
