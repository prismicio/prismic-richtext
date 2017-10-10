declare function fromRichText<T>(richText: any[], serialize: (type: string, data: any, text: string | null, children: T[] | null) => T, htmlSerializer: (data: any, text: string | null, children: T[] | null) => T): T[];
export default fromRichText;
