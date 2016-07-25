"use strict"
var zaif = require('zaif.jp');
var OrderBook = require('..');

var getZaifDepth = function(base, counter){
    var api = zaif.PublicApi;
    return api.depth([base,counter].join('_'), 200).then(function(depth){
        var okcoinMapper = function(row){ return [row[0], row[1]] }
        return new OrderBook(depth.asks.map(okcoinMapper), depth.bids.map(okcoinMapper), "ZAIF");
    })
}
var map = [1,2,3,4,5,10,15,20,25,30]
getZaifDepth("BTC","JPY").then(function(book){ return book.dmap(map) }).then(function(book){
    var asks = Object.keys(book.asks).map(function(k){ return [Math.ceil(book.asks[k].val/10)*10, Math.floor(book.asks[k].vol*10)/10] })
    var bids = Object.keys(book.bids).map(function(k){ return [Math.floor(book.bids[k].val/10)*10, Math.floor(book.bids[k].vol*10)/10] })
    return new OrderBook(asks, bids, "ZAIF");
}).then(console.log)
