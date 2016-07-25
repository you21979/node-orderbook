"use strict"
var OrderBook = require('..');
var fs = require("fs");
var depth = JSON.parse(fs.readFileSync("../fixture/btcbook.json", "utf8"))

console.log(depth)

var getDepth = function(){
    return new Promise(function(resolve){
        var okcoinMapper = function(row){ return [row[0], row[1]] }
        resolve(new OrderBook(depth.asks.map(okcoinMapper), depth.bids.map(okcoinMapper), "OKCOIN"));
    })
}

var map = [0.1,0.2,0.3,0.4,0.5,0.6,0.7]
getDepth().then(function(book){ return book.dmap(map) }).then(function(book){
    var asks = Object.keys(book.asks).map(function(k){ return [(book.asks[k].val).toFixed(3), Math.floor(book.asks[k].vol)] })
    var bids = Object.keys(book.bids).map(function(k){ return [(book.bids[k].val).toFixed(3), Math.floor(book.bids[k].vol)] })
    return new OrderBook(asks, bids, "OKCOIN");
}).then(console.log)


