"use strict"
var okcoin = require('okcoin.com');
var api = okcoin.PublicApi;
var OrderBook = require('..');


api.spot.depth("btc_usd", 60).then(function(depth){
    var okcoinMapper = function(row){ return [row[0], row[1]] }
    return new OrderBook(depth.asks.map(okcoinMapper), depth.bids.map(okcoinMapper));
}).then(function(book){
    console.log(book.sum())
})


