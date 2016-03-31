"use strict"
var bookUtil = require('./book_util');

var OrderBook = module.exports = function(asks, bids){
    this.asks = asks.sort(bookUtil.sort_asc)
    this.bids = bids.sort(bookUtil.sort_desc)
}

OrderBook.prototype.marge = function(digit){
    return new OrderBook(
        bookUtil.marge_up(this.asks, digit),
        bookUtil.marge_down(this.bids, digit)
    );
}

OrderBook.prototype.clone = function(){
    return new OrderBook(this.asks, this.bids);
}

OrderBook.prototype.reverse = function(digit){
    return new OrderBook(
        this.bids.map(function( row ){ return [1/row[0], row[1]] }),
        this.asks.map(function( row ){ return [1/row[0], row[1]] })
    ).marge(digit || 6)
}

