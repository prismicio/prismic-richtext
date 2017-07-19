const assert = require('assert');
const stringify = require('json-stable-stringify');
const asGenericTree = require('../dist/prismic-richtext.js').asGenericTree;

function mockKeys(value) {
  return value.replace(/"(key)":"((\\"|[^"])+)"/g, `"key":"mockkey"`);
}

console.log(mockKeys(JSON.stringify(asGenericTree([
   {
      "type":"paragraph",
      "text":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat",
      "spans":[
         {
            "start":0,
            "end":40,
            "type":"strong"
         },
         {
            "start":10,
            "end":20,
            "type":"hyperlink",
            "data":{
               "id":"WV5Fcy0AAC0A_RiJ",
               "type":"page",
               "tags":[

               ],
               "slug":"salut-les-francais",
               "uid":"francais",
               "link_type":"Document",
               "isBroken":false
            },
            "url":"http://google.fr"
         }
      ]
   }
], () => {return '/mockurl'}))))

describe('Build generic tree from rich text', function () {
    it('should split nodes according to priorities', function () {
      
      const expected = mockKeys(stringify(
        {"root":{"key":"mockkey","start":0,"end":0,"type":"paragraph","content":{},"children":[{"key":"mockkey","start":0,"end":701,"type":"paragraph","content":{"kind":6,"value":{"type":"paragraph","text":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat","spans":[{"start":8,"end":43,"type":"strong"},{"start":33,"end":69,"type":"em"},{"start":36,"end":45,"type":"hyperlink","data":{"id":"WV5Fcy0AAC0A_RiJ","type":"page","tags":[],"slug":"salut-les-francais","uid":"francais","link_type":"Document","isBroken":false},"url":"http://google.fr"}]},"content":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat"},"children":[{"key":"mockkey","start":0,"end":5,"type":"span","content":{"kind":18,"value":{},"content":"demo text"},"children":[],"isRoot":false},{"key":"mockkey","start":8,"end":35,"type":"strong","content":{"kind":8,"value":{"start":8,"end":43,"type":"strong"},"content":"inventore veritatis et quasarchitec"},"children":[{"key":"mockkey","start":33,"end":35,"type":"em","content":{"kind":9,"value":{"start":33,"end":69,"type":"em"},"content":"asarchitecto beatae vitae dicta sunt"},"children":[],"isRoot":false}],"isRoot":false},{"key":"mockkey","start":36,"end":45,"type":"hyperlink","content":{"kind":16,"value":{"start":36,"end":45,"type":"hyperlink","data":{"id":"WV5Fcy0AAC0A_RiJ","type":"page","tags":[],"slug":"salut-les-francais","uid":"francais","link_type":"Document","isBroken":false},"url":"http://google.fr"},"content":"rchitecto","url":"http://google.fr"},"children":[{"key":"mockkey","start":36,"end":43,"type":"strong","content":{"kind":8,"value":{"start":8,"end":43,"type":"strong"},"content":"inventore veritatis et quasarchitec"},"children":[{"key":"mockkey","start":36,"end":43,"type":"em","content":{"kind":9,"value":{"start":33,"end":69,"type":"em"},"content":"asarchitecto beatae vitae dicta sunt"},"children":[],"isRoot":false}],"isRoot":false}],"isRoot":false},{"key":"mockkey","start":44,"end":69,"type":"em","content":{"kind":9,"value":{"start":33,"end":69,"type":"em"},"content":"asarchitecto beatae vitae dicta sunt"},"children":[],"isRoot":false}],"isRoot":false}],"isRoot":true}}
      ));


      const toTest = [{"type":"paragraph","text":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat","spans":[{"start":8,"end":43,"type":"strong"},{"start":33,"end":69,"type":"em"},{"start":36,"end":45,"type":"hyperlink","data":{"id":"WV5Fcy0AAC0A_RiJ","type":"page","tags":[],"slug":"salut-les-francais","uid":"francais","link_type":"Document","isBroken":false},"url":"http://google.fr"}]}];
        assert.equal(
          mockKeys(stringify(asGenericTree(toTest, () => {return '/mockurl'}))),
          expected
        );
    });
});
