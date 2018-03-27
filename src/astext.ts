import { RichTextBlock } from './richtext';

function asText(richtext: RichTextBlock[], joinString: string | null | undefined) {
  const join = typeof joinString === 'string' ? joinString : ' ';
  return richtext.map(block => block.text).join(join);
}

export default asText;
