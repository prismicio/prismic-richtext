const assert = require('assert');
const stringify = require('json-stable-stringify');
const asTree = require('../dist/prismic-richtext.js').asTree;
const asSerializedTree = require('../dist/prismic-richtext.js').asSerializedTree;

function mockKeys(value) {
  return value.replace(/"(key)":"((\\"|[^"])+)"/g, `"key":"mockkey"`);
}

console.log(mockKeys(JSON.stringify(asTree([
   {
      "type":"paragraph",
      "text":"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. ",
      "spans":[
         {
            "start":19,
            "end":29,
            "type":"hyperlink",
            "data":{
               "link_type":"Web",
               "url":"http://google.fr"
            }
         },
         {
            "start":195,
            "end":210,
            "type":"strong"
         },
         {
            "start":422,
            "end":435,
            "type":"em"
         }
      ]
   },
   {
      "type":"image",
      "url":"https://prismic-io.s3.amazonaws.com/prismic-apiv2-i18n/c8a0a4abda439ae4746bafac3c06edf0c5e3a3bd_toy_story_wallpaper_by_artifypics-d5gss19.jpg",
      "alt":null,
      "copyright":null,
      "dimensions":{
         "width":800,
         "height":600
      },
      "linkTo":{
         "id":"WRM47SYAACcAAFsR",
         "type":"test",
         "tags":[

         ],
         "slug":"dummy-doc-for-documentlink",
         "lang":"en-us",
         "uid":"dummydoc",
         "link_type":"Document",
         "isBroken":false
      }
   }
], () => {return '/mockurl'}))))



// describe('Build generic tree from rich text', function () {
//     it('should split nodes according to priorities', function () {
      
//       const expected = mockKeys(stringify(
//         {"root":{"key":"mockkey","start":0,"end":0,"type":"paragraph","content":{},"children":[{"key":"mockkey","start":0,"end":701,"type":"paragraph","content":{"kind":6,"value":{"type":"paragraph","text":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat","spans":[{"start":8,"end":43,"type":"strong"},{"start":33,"end":69,"type":"em"},{"start":36,"end":45,"type":"hyperlink","data":{"id":"WV5Fcy0AAC0A_RiJ","type":"page","tags":[],"slug":"salut-les-francais","uid":"francais","link_type":"Document","isBroken":false},"url":"http://google.fr"}]},"content":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat"},"children":[{"key":"mockkey","start":0,"end":5,"type":"span","content":{"kind":18,"value":{},"content":"demo text"},"children":[],"isRoot":false},{"key":"mockkey","start":8,"end":35,"type":"strong","content":{"kind":8,"value":{"start":8,"end":43,"type":"strong"},"content":"inventore veritatis et quasarchitec"},"children":[{"key":"mockkey","start":33,"end":35,"type":"em","content":{"kind":9,"value":{"start":33,"end":69,"type":"em"},"content":"asarchitecto beatae vitae dicta sunt"},"children":[],"isRoot":false}],"isRoot":false},{"key":"mockkey","start":36,"end":45,"type":"hyperlink","content":{"kind":16,"value":{"start":36,"end":45,"type":"hyperlink","data":{"id":"WV5Fcy0AAC0A_RiJ","type":"page","tags":[],"slug":"salut-les-francais","uid":"francais","link_type":"Document","isBroken":false},"url":"http://google.fr"},"content":"rchitecto","url":"http://google.fr"},"children":[{"key":"mockkey","start":36,"end":43,"type":"strong","content":{"kind":8,"value":{"start":8,"end":43,"type":"strong"},"content":"inventore veritatis et quasarchitec"},"children":[{"key":"mockkey","start":36,"end":43,"type":"em","content":{"kind":9,"value":{"start":33,"end":69,"type":"em"},"content":"asarchitecto beatae vitae dicta sunt"},"children":[],"isRoot":false}],"isRoot":false}],"isRoot":false},{"key":"mockkey","start":44,"end":69,"type":"em","content":{"kind":9,"value":{"start":33,"end":69,"type":"em"},"content":"asarchitecto beatae vitae dicta sunt"},"children":[],"isRoot":false}],"isRoot":false}],"isRoot":true}}
//       ));


//       const toTest = [{"type":"paragraph","text":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat","spans":[{"start":8,"end":43,"type":"strong"},{"start":33,"end":69,"type":"em"},{"start":36,"end":45,"type":"hyperlink","data":{"id":"WV5Fcy0AAC0A_RiJ","type":"page","tags":[],"slug":"salut-les-francais","uid":"francais","link_type":"Document","isBroken":false},"url":"http://google.fr"}]}];
//         assert.equal(
//           mockKeys(stringify(asTree(toTest, () => {return '/mockurl'}))),
//           expected
//         );
//     });
// });
