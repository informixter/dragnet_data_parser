# dragnet_data_parser
npm package parsing and save data for https://github.com/seomoz/dragnet_data


```javascript
var links = [
    "http://newssite.com/news1.html",
    "http://newssite.com/news2.html",
    "http://newssite.com/news3.html",
    "http://newssite.com/news4.html",
];
var cssSelector = "[itemprop='articleBody'] p";
var prefix = "l";
var outdir = "tmp";
var r = new DDP(links, cssSelector, prefix, outdir);
r.run().then(success => {
    console.log('Ready')
}).catch(error => {
    console.error(error)
})
```