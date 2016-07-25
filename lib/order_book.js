"use strict"
var bookUtil = require('./book_util');
var dmap = require('./dmap');

var OrderBook = module.exports = function(asks, bids, name){
    this.asks = asks.sort(bookUtil.sort_asc)
    this.bids = bids.sort(bookUtil.sort_desc)
    this.name = name || ''
}

OrderBook.prototype.marge = function(digit){
    return new OrderBook(
        bookUtil.marge_up(this.asks, digit),
        bookUtil.marge_down(this.bids, digit),
        this.name
    );
}

OrderBook.prototype.clone = function(){
    return new OrderBook(this.asks, this.bids, this.name);
}

OrderBook.prototype.reverse = function(digit){
    return new OrderBook(
        this.bids.map(function( row ){ return [1/row[0], row[1]] }),
        this.asks.map(function( row ){ return [1/row[0], row[1]] }),
        this.name
    ).marge(digit || 6)
}

OrderBook.prototype.sum = function(){
}

OrderBook.prototype.first = function(size){
    size = size || 1;
    return new OrderBook(this.asks.slice(0, size), this.bids.slice(0, size), this.name);
}

OrderBook.prototype.last = function(size){
    size = size || 1;
    return new OrderBook(this.asks.slice(-size), this.bids.slice(-size), this.name);
}

OrderBook.prototype.sum = function(){
    return {
        ask : bookUtil.sum(this.asks),
        bid : bookUtil.sum(this.bids),
    }
}

OrderBook.prototype.dmap = function(pers){
    return dmap(this, pers);
}
