const chai = require('chai');
const chaiSubset = require('chai-subset');
const PrismicRichText = require('../dist/prismic-richtext.min.js');
const expect = chai.expect;

chai.use(chaiSubset);

describe('asText', function() {
  const mock = [
    { type: 'paragraph', text: 'A > B', spans: [] },
    { type: 'preformatted', text: '<example>\n  TEST\n</example>', spans: [] },
    {
      'type': 'paragraph',
      'text': 'This is bold and italic and both.',
      'spans': [
        {
          'start': 8,
          'end': 12,
          'type': 'strong'
        },
        {
          'start': 17,
          'end': 23,
          'type': 'em'
        },
        {
          'start': 28,
          'end': 32,
          'type': 'strong'
        },
        {
          'start': 28,
          'end': 32,
          'type': 'em'
        }
      ]
    }
  ];

  context('applying mock object using default join string (undefined)', function() {
    const result = PrismicRichText.asText(mock);

    it('should join blocks with one whitespace (default)', function() {
      expect(result).to.equal('A > B <example>\n  TEST\n</example> This is bold and italic and both.');
    });
  });

  context('applying mock object and join string "\\n"', function() {
    const result = PrismicRichText.asText(mock, '\n');

    it('should join blocks with one line break', function() {
      expect(result).to.equal('A > B\n<example>\n  TEST\n</example>\nThis is bold and italic and both.');
    });
  });
});
