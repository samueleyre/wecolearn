/**
 * Adapted from andy hulstkamp by édouard Touraille
 */
var phantom = require('phantom');

var collectLinks = function ( page ) {
    var hrefs = page.evaluate(function () {
        var links = document.querySelectorAll("h3.r a");
        return Array.prototype.map.call(links, function (anchor) {
            return anchor.getAttribute("href");
        });
    });
    return hrefs;
}


var getUrl = function ( q , index ) {
    
    let start  = 10 * index;
    let ret =  'https://www.google.fr/search?q=' + q +'&start=' + start;
    return ret;
}

var cookies = function( page, index , cookies ) {
    page.property('cookies').then(function( cookies) {
        console.log(cookies);
    });
}

var iterate = function ( page , q ,  maxIndex, index, allLinks, cb) {

    page.evaluate(function( q, index ) {
        document.location.href = 'https://www.google.fr/search?q=' + q +'&start=' + index * 10
    } ,q, index ).then(function() {
        setTimeout(function() {
            page.property('plainText').then(function(content) {
                console.log(content);
            });
            collectLinks( page ).then(function( links ) {
                console.log( links);
                allLinks.push( links );
                if( index ++ > maxIndex ) {
                    cb( null, allLinks );
                } else {
                    iterate( page, q, maxIndex, index, allLinks, cb );
                }
            });
        },4000);
    });
}

exports.search = function ( req, cb ) { 


    
    /*
    (function(cb){ 
        
        var scraper = require('google-search-scraper');

        var DeathByCaptcha = require('deathbycaptcha');

        var dbc = new DeathByCaptcha('edouard.touraille', 'oldB1otopeCellule');

        var ret = [];
        
        var options = {
          query: 'vidal sassoun',
          host: 'www.google.fr',
          lang: 'fr',
          age: 'd1', // last 24 hours ([hdwmy]\d? as in google URL)
          limit: 100,
          params: {},
          solver: dbc // params will be copied as-is in the search URL query string
        };

        let rets = [];
        scraper.search( options, function( err, url ) {
            ret.push(url);
            console.log(err);
        });

    })(cb)
    */

    
    (function(cb) {
        allLinks = [];
        phantom.create().then( function ( ph ) {
            ph.createPage().then(function( page ) {
                let q = 'toto';
                let index = 10;
                page.open(getUrl(q, index )).then(function(status) {
                    iterate( page, q, 3, 0, allLinks, cb);    
                })
            }); 
        });

    })(cb);

}
