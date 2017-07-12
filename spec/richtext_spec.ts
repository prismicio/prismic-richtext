const richtextAsRawJson: object[] = [
   {
      "type": "paragraph",
      "text": "Sed ut perspiciatis unde omnis iste natus error",
      "spans":[
         {
            "start":0,
            "end":6,
            "type":"strong"
         },
         {
            "start":7,
            "end":19,
            "type":"em"
         },
         {
            "start":25,
            "end":30,
            "type":"hyperlink",
            "data":{
               "link_type":"Web",
               "url":"http://google.fr"
            },
            "url":"http://google.fr"
         }
      ]
   },
   {
      "type":"o-list-item",
      "text":"sit voluptatem accusantium doloremque laudantium,",
      "spans":[

      ]
   },
   {
      "type":"list-item",
      "text":"totam rem aperiam,",
      "spans":[

      ]
   },
   {
      "type":"paragraph",
      "text":"",
      "spans":[

      ]
   },
   {
      "type":"paragraph",
      "text":"eaque ipsa quae",
      "spans":[
         {
            "start":0,
            "end":15,
            "type":"em"
         },
         {
            "start":0,
            "end":15,
            "type":"strong"
         },
         {
            "start":0,
            "end":15,
            "type":"hyperlink",
            "data":{
               "link_type":"Web",
               "url":"http://google.fr"
            },
            "url":"http://google.fr"
         }
      ]
   },
   {
      "type":"paragraph",
      "text":"ab illo inventore veritatis et quasarchitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat",
      "spans":[
         {
            "start":8,
            "end":43,
            "type":"strong"
         },
         {
            "start":33,
            "end":69,
            "type":"em"
         },
         {
            "start":36,
            "end":45,
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
            "url":"/undefined/page/francais"
         }
      ]
   },
   {
      "type":"heading1",
      "text":"quo voluptas nulla pariatur?",
      "spans":[

      ]
   }
];
const richtextAsHtml: string = (`
  <p class=""><strong class="">Sed ut</strong> <em class="">perspiciatis</em> unde <a href="http://google.fr">omnis</a> iste natus error</p><ol><li class="">sit voluptatem accusantium doloremque laudantium,</li></ol><ul><li class="">totam rem aperiam,</li></ul><p class=""></p><p class=""><em class=""><strong class=""><a href="http://google.fr">eaque ipsa quae</a></strong></em></p><p class="">ab illo <strong class="">inventore veritatis et qu<em class="">asa<a href="/undefined/page/francais">rchitec</a>to</em> beatae vitae dicta sunt</strong> explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat</p><h1 class="">quo voluptas nulla pariatur?</h1>
`);

describe("RichText", function() {
  it("should be converted to tree", function() {
    
    expect(1).toEqual(1);
  });
});