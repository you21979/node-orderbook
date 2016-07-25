"use strict"
var makeDistMap = module.exports = function(book, pers){
    var spread = book.first()
    var ask = parseFloat(spread.asks[0][0])
    var bid = parseFloat(spread.bids[0][0])
    var avg = (ask + bid) / 2
    var dmap = pers || [5,10,15,20,25,30]
    var a_dmap = dmap.map(function(per){
        return {
            per : per,
            val : avg + (avg * 0.01 * per),
        }
    })
    var b_dmap = dmap.map(function(per){
        return {
            per : per,
            val : avg - (avg * 0.01 * per),
        }
    })
    var a_stat = book.asks.reduce(function(r,ask){
        var p = ask[0]
        var n = ask[1]
        
        var ans = a_dmap.filter(function(v){
            return p < v.val
        })
        if(ans.length){
            r[ans[0].per].vol += n
        }
        return r
    }, a_dmap.reduce(function(r,v){ r[v.per] = {per:v.per, val:v.val, vol:0}; return r }, {}))
    var b_stat = book.bids.reduce(function(r,bid){
        var p = bid[0]
        var n = bid[1]
        
        var ans = b_dmap.filter(function(v){
            return p > v.val
        })
        if(ans.length){
            r[ans[0].per].vol += n
        }
        return r
    }, b_dmap.reduce(function(r,v){ r[v.per] = {per:v.per, val:v.val, vol:0}; return r }, {}))
    return {
        asks:a_stat,
        bids:b_stat,
    }
}
