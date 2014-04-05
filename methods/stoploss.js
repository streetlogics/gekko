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
  if(this.lastPrice < settings.sell_price && this.currentTrend != "short") {
      // If it's below sell and not short, set it to short
      this.currentTrend = 'short';
      this.advice('short');
  // } else if(this.currentTrend == 'short' && settings.buyback_price && this.lastPrice < settings.buyback_price){
  //     // If it was short, and price is below buyback, buy back in
  //     this.currentTrend = 'long';
  //     this.advice('long');
  //     var old_buyback = settings.buyback_price;
  //     settings.buyback_price = (1 -((settings.sell_price - settings.buyback_price) / settings.sell_price)) * settings.buyback_price;
  //     settings.sell_price = old_buyback;
  }else{
    this.advice();
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
