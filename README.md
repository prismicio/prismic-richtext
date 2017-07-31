## A helper to build generic tree from rich text raw json

### Get a generic tree from a richtext
```javascript
  import PrismicRichText from 'prismic-richtext';

  PrismicRichText.asTree(doc.data.myRichText)
```

### Get a serialized tree from a richtext

You can find an example here: https://github.com/prismicio/prismic-dom/blob/master/src/index.js

```javascript
  import PrismicRichText from 'prismic-richtext';
  // define a serialize function to manage your fragment
  // you can use the 'Element' Helper from PrismicRichText to match the different fragments
  function serialize() {...}
  
  PrismicRichText.serialize(doc.data.myRichText, serialize, htmlSerializer)
```