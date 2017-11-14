const path = require('path');
const PrismicRichText = require(path.join(__dirname, '../', 'dist', 'prismic-richtext.min.js'));
const chai = require('chai');
const chaiSubset = require('chai-subset');
const expect = chai.expect;

chai.use(chaiSubset);

describe('Tree', function() {

  describe('asTree', function() {

    function buildExpectedTree(richText, spans) {
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
      const expectedTree = buildExpectedTree(richText, spans);

      expect(tree).to.containSubset(expectedTree)
      expect(tree.children.length).to.equal(expectedTree.children.length);
    });

    it('Fusce commodo. Donec <strong>posuere</strong> augue in quam.', function() {
      const spans = [{ start: 21, end: 28, type: "strong" }];
      const richText = [{
        type: "paragraph",
        text: "Fusce commodo. Donec posuere augue in quam.",
        spans: spans
      }];

      const tree = PrismicRichText.asTree(richText);

      const expectedSpans = [
        { type: 'span', start: 0, end: 21 },
        { type: 'strong', start: 21, end: 28 },
        { type: 'span', start: 28, end: 43 },
      ];

      const expectedTree = buildExpectedTree(richText, expectedSpans);

      expect(tree).to.containSubset(expectedTree);
      expect(tree.children.length).to.equal(expectedTree.children.length);
      expect(tree.children[0].children.length).to.equal(expectedTree.children[0].children.length);
    });

    it('Fusce commodo. Donec <strong>pos</strong><a><strong>uere</strong> <i>aug</i></a><i>ue</i> in quam.', function() {
      const spans = [
        { start: 21, end: 28, type: "strong" },
        { start: 24, end: 32, type: "hyperlink", data: { preview: { title: "https://prismic.io" }, url: "https://prismic.io" } },
        { start: 30, end: 33, type: "em"  }
      ];

      const richText = [{
	    type: "paragraph",
	    text: "Fusce commodo. Donec posuere augue in quam.",
	    spans: spans
      }];

      const tree = PrismicRichText.asTree(richText);
      const expectedSpans = [
        { type: 'span', start: 0, end: 21 },
        { type: 'strong', start: 21, end: 24 },
        { type: 'hyperlink', start: 24, end: 32, children: [
          { type: 'strong', start: 24, end: 28 },
          { type: 'span', start: 28, end: 30 },
          { type: 'em', start: 30, end: 32 }]
        },
        { type: 'em', start: 32, end: 33 },
        { type: 'span', start: 33, end: 43 },
      ];

      const expectedTree = buildExpectedTree(richText, expectedSpans);

      expect(tree).to.containSubset(expectedTree);

      expect(tree.children.length).to.equal(expectedTree.children.length);
      expect(tree.children[0].children.length).to.equal(expectedTree.children[0].children.length);
      expect(tree.children[0].children[2].children.length).to.equal(expectedTree.children[0].children[2].children.length);
    });

    it('<label>Fusce <strong>commodo. Donec</strong> posuere <em>augue in</em> quam.</label>', function() {

      const spans = [
        { start: 0, end: 43, type: "label", data: "labelA" },
        { start: 15, end: 20, type: "strong" },
        { start: 29, end: 34, type: "em"}
      ];

      const richText = [{
	    type: "paragraph",
	    text: "Fusce commodo. Donec posuere augue in quam.",
	    spans: spans
      }];

      const tree = PrismicRichText.asTree(richText);

      const expectedSpans = [
        { type: 'label', start: 0, end: 43, children: [
          { type: 'span', start: 0, end: 15 },
          { type: 'strong', start: 15, end: 20 },
          { type: 'span', start: 20, end: 29 },
          { type: 'em', start: 29, end: 34 },
          { type: 'span', start: 34, end: 43 },
        ]}
      ];

      const expectedTree = buildExpectedTree(richText, expectedSpans);

      expect(tree).to.containSubset(expectedTree);

      expect(tree.children.length).to.equal(expectedTree.children.length);
      expect(tree.children[0].children.length).to.equal(expectedTree.children[0].children.length);
      expect(tree.children[0].children[0].children.length).to.equal(expectedTree.children[0].children[0].children.length);
    });

    it('<label>Fusce comm<a>odo. <strong>Donec</strong> posuere <em>augue in</em> qu</a>am.</label>', function() {

      const spans = [
        { start: 0, end: 43, type: "label", data: "totoA"},
        { start: 10, end: 40, type: "hyperlink", data: { preview: { title: "https://google.fr" }, url: "https://google.fr"} },
        { start: 15, end: 20, type: "strong"},
        { start: 29, end: 34, type: "em"}
      ];

      const richText = [{
	    type: "paragraph",
	    text: "Fusce commodo. Donec posuere augue in quam.",
	    spans: spans
      }];

      const tree = PrismicRichText.asTree(richText);

      const expectedSpans = [
        { type: 'label', start: 0, end: 43, children: [
          { type: 'span', start: 0, end: 10 },
          { type: 'hyperlink', start: 10, end: 40, children: [
            { type: 'span', start: 10, end: 15 },
            { type: 'strong', start: 15, end: 20 },
            { type: 'span', start: 20, end: 29 },
            { type: 'em', start: 29, end: 34 },
            { type: 'span', start: 34, end: 40 },
          ]},
          { type: 'span', start: 40, end: 43 },
        ]}
      ];

      const expectedTree = buildExpectedTree(richText, expectedSpans);

      expect(tree).to.containSubset(expectedTree);

      expect(tree.children.length).to.equal(expectedTree.children.length);
      expect(tree.children[0].children.length).to.equal(expectedTree.children[0].children.length);
      expect(tree.children[0].children[0].children.length).to.equal(expectedTree.children[0].children[0].children.length);
      expect(tree.children[0].children[0].children[1].children.length).to.equal(expectedTree.children[0].children[0].children[1].children.length);
    });
  });
});
