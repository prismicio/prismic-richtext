const path = require("path");
const PrismicRichText = require(path.join(
  __dirname,
  "../",
  "dist",
  "prismic-richtext.min.js",
));
const chai = require("chai");
const chaiSubset = require("chai-subset");
const expect = chai.expect;

chai.use(chaiSubset);

describe("Serialize", function() {
  describe("fromRichText", function() {
    it("provides an index to the serializer function", function() {
      const richText = [
        {
          type: "paragraph",
          text: "P 1",
          spans: [],
        },
        {
          type: "list-item",
          text: "L 1",
          spans: [],
        },
        {
          type: "list-item",
          text: "L 2",
          spans: [],
        },
      ];
      function serializer(type, element, text, children, index) {
        return { index, text, children };
      }

      const serialized = PrismicRichText.serialize(richText, serializer);
      expect(serialized).to.eql([
        {
          index: 0,
          text: null,
          children: [{ text: "P 1", children: [], index: 0 }],
        },
        {
          index: 1,
          children: [
            {
              index: 0,
              text: null,
              children: [
                {
                  index: 0,
                  text: "L 1",
                  children: [],
                },
              ],
            },
            {
              index: 1,
              text: null,
              children: [
                {
                  index: 0,
                  text: "L 2",
                  children: [],
                },
              ],
            },
          ],
          text: null,
        },
      ]);
    });
  });
});
