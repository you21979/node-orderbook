"use strict"
var okcoin = require('okcoin.com');
var OrderBook = require('..');

var getOkcoinDepth = function(base, counter){
    var api = okcoin.PublicApi;
    return api.spot.depth([base,counter].join('_'), 200).then(function(depth){
        var okcoinMapper = function(row){ return [row[0], row[1]] }
        return new OrderBook(depth.asks.map(okcoinMapper), depth.bids.map(okcoinMapper), "OKCOIN");
    })
}
var map = [1,2,3,4,5,10,15,20,25,30]
getOkcoinDepth("BTC","USD").then(function(book){ return book.dmap(map) }).then(function(book){
    var asks = Object.keys(book.asks).map(function(k){ return [(book.asks[k].val).toFixed(3), Math.floor(book.asks[k].vol)] })
    var bids = Object.keys(book.bids).map(function(k){ return [(book.bids[k].val).toFixed(3), Math.floor(book.bids[k].vol)] })
    return new OrderBook(asks, bids, "OKCOIN");
}).then(console.log)
