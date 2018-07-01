# dragnet_data_parser
npm package parsing and save data for https://github.com/seomoz/dragnet_data

## Installation

  `npm install @informix/dragnet_data_parser`

## Usage

```javascript
var ddp = require("async");
var links = [
    "http://newssite.com/news1.html",
    "http://newssite.com/news2.html",
    "http://newssite.com/news3.html",
    "http://newssite.com/news4.html",
];
var cssSelector = "[itemprop='articleBody'] p";
var prefix = "l";
var outdir = "tmp";

ddp(links, cssSelector, prefix, outdir).run().then(success => {
    console.log('Ready')
}).catch(error => {
    console.error(error)
})
```