"use strict"
var poloniex = require('@you21979/poloniex.com');
var bittrex = require('@you21979/bittrex.com');

var OrderBook = require('..');

var getPoloniexDepth = function(base, counter){
    var api = poloniex.PublicApi;
    return api.orderBook([counter,base].join('_'), 200).then(function(book){
        var mapper = function(row){ return [row[0], row[1]] }
        return new OrderBook(book.asks.map(mapper), book.bids.map(mapper), "POLONIEX");
    })
}
var getBittrexDepth = function(base, counter){
    var api = bittrex.PublicApi;
    return api.getOrderBook([counter,base].join('-'), 200).then(function(book){
        var mapper = function(row){ return [row.Rate, row.Quantity] }
        return new OrderBook(book.sell.map(mapper), book.buy.map(mapper), "BITTREX");
    })
}

var map = [1,2,3,4,5,10,15,20,25,30]
getPoloniexDepth("XRP","BTC").then(function(book){ return book.dmap(map) }).then(function(book){
    var asks = Object.keys(book.asks).map(function(k){ return [(book.asks[k].val).toFixed(8), book.asks[k].vol] })
    var bids = Object.keys(book.bids).map(function(k){ return [(book.bids[k].val).toFixed(8), book.bids[k].vol] })
    return new OrderBook(asks, bids, "POLONIEX");
}).then(console.log)
getBittrexDepth("XRP","BTC").then(function(book){ return book.dmap(map) }).then(function(book){
    var asks = Object.keys(book.asks).map(function(k){ return [(book.asks[k].val).toFixed(8), book.asks[k].vol] })
    var bids = Object.keys(book.bids).map(function(k){ return [(book.bids[k].val).toFixed(8), book.bids[k].vol] })
    return new OrderBook(asks, bids, "BITTREX");
}).then(console.log)
