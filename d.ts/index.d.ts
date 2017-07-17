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
    type: string;
    content: IElement;
    children: ILeaf[];
    isRoot: boolean;
    contains(node: ILeaf): boolean;
    isOutside(node: ILeaf): boolean;
    add(leaf: ILeaf): void;
    remove(leaf: ILeaf): void;
    copy(start?: number, end?: number): ILeaf;
    flatWithChildren(): ILeaf[];
}
export declare class Tree implements ITree {
    root: ILeaf;
    private constructor();
    static create(): Tree;
    static subTree(leaf: ILeaf): ITree;
    addChild(leaf: ILeaf): void;
    insert(leaf: ILeaf): ILeaf;
    _explore(ancestor: ILeaf, toExplore: ILeaf, toProcess: ILeaf): ILeaf | null;
    _defineEligibleNodeToSplit(node1: ILeaf, node2: ILeaf): [ILeaf, ILeaf];
    _processNodeToSplit(ancestor: ILeaf, immutable: ILeaf, toSplit: ILeaf): void;
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
    add(leaf: ILeaf): void;
    remove(leaf: ILeaf): void;
    copy(start?: number, end?: number): ILeaf;
    flatWithChildren(): ILeaf[];
}
export declare function asGenericTree(richText: any[], linkResolver: (doc: any, isBroken: boolean) => string): ITree;
