var path = require('path');
var PrismicRichText = require(path.join(__dirname, '../', 'dist', 'prismic-richtext.min.js'));

describe('Engine', function() {

  it('', function() {
    var richtext = [
      {
        "text":"toto titi tata",
        "spans":[
          {
            "start":4,
            "end": 9,
            "type":"em"
          },{
            "start": 7,
            "end": 14,
            "type":
            "strong"
          }
        ]
      }
    ];

    var tree = PrismicRichText.asTree1(richtext);
    console.log(JSON.stringify(tree, null, 2));
  });
});
