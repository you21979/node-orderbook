"use strict"

var BigNumber = require("bignumber.js");

var sort_asc = exports.sort_asc = function(a, b){
    if(a[0] < b[0]) return -1
    else if(a[0] > b[0]) return 1
    else return 0
}

var sort_desc = exports.sort_desc = function(a, b){
    if(a[0] > b[0]) return -1
    else if(a[0] < b[0]) return 1
    else return 0
}
var round_up = exports.round_up = function(n, digit){
    var p = Math.pow(10, digit);
    return Math.ceil(n * p) / p;
}
var round_down = exports.round_down = function(n, digit){
    var p = Math.pow(10, digit);
    return Math.floor(n * p) / p;
}

var marge = exports.marge = function(tuple_list, digit, round){
    var obj = tuple_list.map(function(tuple){ return [round(tuple[0], digit), new BigNumber(tuple[1])] }).
        reduce(function(r, v){
            var key = v[0];
            r[key] = (r[key] || new BigNumber(0)).add(v[1])
            return r;
        }, {});
    return Object.keys(obj).map(function(key){ return [parseFloat(key), obj[key].toNumber()] })
}

var marge_up = exports.marge_up = function(tuple_list, digit){
    return marge(tuple_list, digit, round_up).sort(sort_asc)
}

var marge_down = exports.marge_down = function(tuple_list, digit){
    return marge(tuple_list, digit, round_down).sort(sort_desc);
}

