var rp = require('request-promise');
var fs = require('fs');
var path = require("path")
var cheerio = require('cheerio')

class DDP {

    /**
     * Constructor method
     * @param {Array} links 
     * @param {String} cssSelector 
     * @param {String} outdir 
     */
    constructor(links, cssSelector, prefix, outdir) {
        this.links = links;
        this.cssSelector = cssSelector;
        this.outdir = outdir;
        this.prefix = prefix;
    }

    /**
     * Start parse
     * @returns {Promise}
     */
    run(debug = true) {
        this.debug = debug;
        var $this = this
        return new Promise((resolve, reject) => {
            if (this.links.length == 0) {
                reject('Empty links');
                return;
            }

            if (!fs.existsSync(this.outdir)) {
                fs.mkdirSync(this.outdir)
            }

            if (!fs.existsSync(`${this.outdir}/HTML/`)) {
                fs.mkdirSync(`${this.outdir}/HTML/`)
            }

            if (!fs.existsSync(`${this.outdir}/Corrected/`)) {
                fs.mkdirSync(`${this.outdir}/Corrected/`)
            }

            var index = 0;
            this.loader(this.links, index, this.loader, resolve, reject, $this)
        })
    }

    /**
     * 
     * @param {Array} links 
     * @param {Number} index 
     * @param {Function} callback 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    loader(links, index, callback, resolve, reject, $this) {
        var outdir = $this.outdir;
        if (links.length > 0 && links[index] == undefined) {
            resolve('done');
        }

        rp(links[index])
            .then(function (htmlString) {

                fs.writeFileSync(`${outdir}/HTML/${$this.prefix}${index}.html`, htmlString);
                var $ = cheerio.load(htmlString);
                var correctedA = []

                $($this.cssSelector).map((i, v) => {
                    correctedA.push($(v).text())
                })

                var str = correctedA.join("\n")
                fs.writeFileSync(`${outdir}/Corrected/${$this.prefix}${index}.html.corrected.txt`, str);
                fs.appendFileSync(`${outdir}/training.txt`, `${$this.prefix}${index}` + "\n");
                if ($this.debug) {
                    console.log('Осталось', links.length - index);
                }
                callback(links, index + 1, callback, resolve, reject, $this)
            })
            .catch((err) => reject(err));
    }
}


/**
 * 
 * @param {Array} links 
 * @param {String} cssSelector 
 * @param {String} prefix 
 * @param {String} outdir 
 */
module.exports = (links = [], cssSelector = "", prefix = "r", outdir = "result") => {
    return new DDP(links, cssSelector, prefix, outdir);
};