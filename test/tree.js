const path = require('path');
const PrismicRichText = require(path.join(__dirname, '../', 'dist', 'prismic-richtext.min.js'));
const chai = require('chai');
const chaiSubset = require('chai-subset');
const expect = chai.expect;

chai.use(chaiSubset);

describe('Tree', function() {

  describe('asTree', function() {

    function expectedTree(richText, spans) {
      return {
        children: richText.map(function(block) {
          return {
            type: "paragraph",
            children: spans.map(function(span) {
              return {
                type: span.type,
                children: span.children || [],
                start: span.start,
                end: span.end,
                text: block.text.slice(span.start, span.end)
              };
            })
          };
        })
      };
    }

    it('Fusce commodo. Donec posuere augue in quam.', function() {
      const spans = [];
      const richText = [{
        type: 'paragraph',
        text: 'Fusce commodo. Donec posuere augue in quam.',
        spans: spans
      }];

      const tree = PrismicRichText.asTree(richText);
      expect(tree).to.containSubset(expectedTree(richText, spans))
    });

    it('Fusce commodo. Donec <strong>posuere</strong> augue in quam.', function() {
      const spans = [{ start: 21, end: 28, type: "strong" }];
      const richText = [{
        type: "paragraph",
        text: "Fusce commodo. Donec posuere augue in quam.",
        spans: spans
      }];
      const tree = PrismicRichText.asTree(richText);
      expect(tree).to.containSubset(expectedTree(richText, spans));
    });

    it('Fusce commodo. Donec <strong>pos</strong><a><strong>uere</strong> <i>aug</i></a><i>ue</i> in quam.', function() {
      const spans = [{
		start: 21,
		end: 28,
		type: "strong"
	  }, {
		start: 24,
		end: 32,
		type: "hyperlink",
		data: {
		  preview: {
			title: "https://prismic.io"
		  },
		  url: "https://prismic.io"
		}
	  }, {
		start: 30,
		end: 33,
		type: "em"
	  }];

      const richText = [{
	    type: "paragraph",
	    text: "Fusce commodo. Donec posuere augue in quam.",
	    spans: spans
      }];

      const tree = PrismicRichText.asTree(richText);
      const expectedSpans = [
        { type: 'strong', start: 21, end: 24 },
        { type: 'hyperlink', start: 24, end: 32, children: [
          { type: 'strong', start: 24, end: 28 },
          { type: 'em', start: 30, end: 32 }]
        },
        { type: 'em', start: 32, end: 33 },
        { type: 'span', start: 33, end: 43 },
      ];

      expect(tree).to.containSubset(expectedTree(richText, expectedSpans));
    });
  });
});
