"use strict"
var okcoin = require('okcoin.com');
var api = okcoin.PublicApi;
var OrderBook = require('..');
api.future.depth("btc_usd", "quarter", 60).then(function(depth){
    var okcoinMapper = function(row){ return [row[0], row[1]] }
    var book = new OrderBook(depth.asks.map(okcoinMapper), depth.bids.map(okcoinMapper));
    console.log(book);
    var marged = book.marge(1)
    console.log(marged);
    var reverse = book.reverse()
    console.log(reverse);
})


