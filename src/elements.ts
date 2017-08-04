import { Link as LinkHelper } from 'prismic-helpers';

export enum ElementKind {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  paragraph,
  preformatted,
  strong,
  em,
  "list-item",
  "o-list-item",
  "group-list-item",
  "group-o-list-item",
  image,
  embed,
  hyperlink,
  label,
  span
};

export const ElementKindAsObj: any = {
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  heading4: "heading4",
  heading5: "heading5",
  heading6: "heading6",
  paragraph: "paragraph",
  preformatted: "preformatted",
  strong: "strong",
  em: "em",
  listItem: "list-item",
  oListItem: "o-list-item",
  list: "group-list-item",
  oList: "group-o-list-item",
  image: "image",
  embed: "embed",
  hyperlink: "hyperlink",
  label: "label",
  span: "span"
};

export interface IElement {
  kind: ElementKind;
  value: any;
  content: string;
}

export class Heading implements IElement {
  kind: ElementKind;
  value: any;
  level: number;
  content: string;

  constructor(value: any, level: number, content: string) {
    this.value = value;
    this.level = level;
    this.content = content;
    
    switch(level) {
      case 1:
        this.kind = ElementKind.heading1;
        break;
      case 2:
        this.kind = ElementKind.heading2;
        break;
      case 3:
        this.kind = ElementKind.heading3;
        break;
      case 4:
        this.kind = ElementKind.heading4;
        break;
      case 5:
        this.kind = ElementKind.heading5;
        break;
      case 6:
        this.kind = ElementKind.heading6;
        break;
      default: throw Error(`Invalid heading level ${level}`);
    };
  }
}

export class ListItem implements IElement {
  kind: ElementKind;
  value: any;
  organized: boolean;
  content: string;

  constructor(value: any, organized: boolean, content: string) {
    this.value = value;
    this.organized = organized;
    this.content = content;
  }
}

export class List implements IElement {
  kind: ElementKind;
  value: ListItem[];
  organized: boolean;
  content: string;

  constructor(value: ListItem[], organized: boolean) {
    this.organized = organized;
    this.value = value;
  }
}

export class Paragraph implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.paragraph;
    this.value = value;
    this.content = content;
  }
}

export class Preformatted implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.preformatted;
    this.value = value;
    this.content = content;
  }
}

export class Strong implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.strong;
    this.value = value;
    this.content = content;
  }
}

export class Emphasized implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.em;
    this.value = value;
    this.content = content;
  }
}

export class Image implements IElement {
  kind: ElementKind;
  url: string;
  value: any;
  content: string;
  linkUrl: string | null;

  constructor(value: any, content: string, linkResolver: (doc: any, isBroken: boolean) => string) {
    this.kind = ElementKind.image;
    this.value = value;
    this.url = this.value.url;
    this.content = content;
    this.linkUrl = value.linkTo ? LinkHelper.url(value.linkTo, linkResolver) : null;
  }
}

export class Embed implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.embed;
    this.value = value;
    this.content = content;
  }
}

export class Link implements IElement {
  kind: ElementKind;
  value: any;
  content: string;
  url: string;

  constructor(value: any, content: string, linkResolver: (doc: any, isBroken: boolean) => string) {
    this.kind = ElementKind.hyperlink;
    this.value = value;
    this.content = content;
    this.url = LinkHelper.url(value, linkResolver);
  }
}

export class Label implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.label;
    this.value = value;
    this.content = content;
  }
}

export class Span implements IElement {
  kind: ElementKind;
  value: any;
  content: string;

  constructor(value: any, content: string) {
    this.kind = ElementKind.span;
    this.value = value;
    this.content = content;
  }
}

export const Element = {
  containsText(element: any): boolean {
    return !(element.type === 'image' || element.type === 'embed');
  },

  isList(elem: any): boolean {
    return !!elem && ElementKindAsObj.list === elem.type;
  },

  isOrderedList(elem: any): boolean {
    return !!elem && ElementKindAsObj.oList === elem.type;
  },

  isListItem(elem: any): boolean {
    return !!elem && ElementKindAsObj.listItem === elem.type;
  },

  isOrderedListItem(elem: any): boolean {
    return !!elem && ElementKindAsObj.oListItem === elem.type;
  },

  isSpan(elem: any): boolean {
    return !!elem && ElementKindAsObj.span === elem.type;
  },

  apply(element: any, content: string, linkResolver: (doc: any, isBroken: boolean) => string): IElement {
    switch(element.type) {
      case 'heading1': return new Heading(element, 1, content);
      case 'heading2': return new Heading(element, 2, content);
      case 'heading3': return new Heading(element, 3, content);
      case 'heading4': return new Heading(element, 4, content);
      case 'heading5': return new Heading(element, 5, content);
      case 'heading6': return new Heading(element, 6, content);
      case 'paragraph': return new Paragraph(element, content);
      case 'preformatted': return new Preformatted(element, content);
      case 'strong': return new Strong(element, content);
      case 'em': return new Emphasized(element, content);
      case 'list-item': return new ListItem(element, false, content);
      case 'o-list-item': return new ListItem(element, true, content);
      case 'image': return new Image(element, content, linkResolver);
      case 'embed': return new Embed(element, content);
      case 'hyperlink': return new Link(element, content, linkResolver);
      case 'label': return new Label(element, content);
      case 'span': return new Span(element, content);
      default: throw new Error(`Invalid element type ${element.type} on element : ${JSON.stringify(element)}`);
    }
  }
}
