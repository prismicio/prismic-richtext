export function init<Element>(arr: Element[]): Element[] {
  return arr.slice(0, -1);
}

export function last<Element>(arr: Element[]): Element | undefined {
  return arr[arr.length - 1];
}

export function flatten<Element>(arr: Array<Element | Element[]>): Element[] {
  const out: Element[] = [];
  for (const element of arr) {
    if (Array.isArray(element)) {
      out.push.apply(out, element);
    } else {
      out.push(element);
    }
  }
  return out;
}

export function sort<Element>(
  arr: Element[],
  comp: (a: Element, b: Element) => number,
): Element[] {
  return [...arr].sort(comp);
}
