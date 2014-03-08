// If you want to use your own trading methods you can
// write them here. For more information on everything you
// can use please refer to this document:
//
// https://github.com/askmike/gekko/blob/master/docs/trading_methods.md
//
// This method can be used to let you manually set a stop loss limit that will
//    trigger a sell if it's hit, or a buy if it's back over the low.

// helpers
var _ = require('lodash');
var log = require('../core/log.js');

var config = require('../core/util.js').getConfig();
var settings = config.stoploss;

// Let's create our own method
var method = {};

// Prepare everything our method needs
method.init = function() {
  this.name = 'Stop Loss';

  this.currentTrend = null;
  this.requiredHistory = 0;
}

// What happens on every new candle?
method.update = function(candle) {
  /* do nothing here */
  if(this.lastPrice < settings.sell_price) {
    if(this.currentTrend != 'short'){
      // If it was long, set it to short
      this.currentTrend = 'short';
      this.advice('short');
    }else{
      this.advice();
    }

  } else {
    if(this.currentTrend != 'long'){
      // If it was long, set it to short
      this.currentTrend = 'long';
      this.advice('long');
    }else{
      this.advice();
    }
  }
}

// For debugging purposes.
method.log = function() {
}

// Based on the newly calculated
// information, check if we should
// update or not.
method.check = function() {

}

module.exports = method;