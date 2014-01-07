
// - Feeding candles to a trading method

var _ = require('lodash');
var log = require('./log.js');
var moment = require('moment');
var utc = moment.utc;

var exchangeChecker = require('./exchangeChecker');

var util = require('./util');
var config = util.getConfig();

var Manager = function() {
  _.bindAll(this);

  this.exchange = exchangeChecker.settings(config.watch);
  this.model = require('./databaseManager');
  this.model.setRealCandleSize(config.tradingAdvisor.candleSize);
}

var Util = require('util');
var EventEmitter = require('events').EventEmitter;
Util.inherits(Manager, EventEmitter);

Manager.prototype.start = function() {
  if(config.backtest.enabled) {
    console.log('WUP WUP this.backtest();');
  } else {
    // watch the market
    var TradeFetcher = require('./tradeFetcher');
    this.fetcher = new TradeFetcher;

    // we pass a fetch to the model right away
    // so it knows how new the history needs to be
    this.fetcher.once('new trades', this.model.checkHistory);

    this.fetcher.on('new trades', this.relayTrade);
    this.model.on('history', this.processHistory);
    this.model.on('real candle', this.relayCandle);
    this.model.on('fake candle', this.relaySmallCandle);

    this.model.once('history', _.bind(function(history) {
      // the first time the model first needs to calculate
      // the available history, after it did this it will
      // process the trades itself
      this.fetcher.on('new trades', this.model.processTrades);
    }, this));
  }
}

Manager.prototype.relayCandle = function(candle) {
  this.emit('candle', candle);
}

Manager.prototype.relaySmallCandle = function(candle) {
 this.emit('small candle', candle); 
}

// only relay if this has not been relied before.
Manager.prototype.relayTrade = function(data) {
  var trade = data.last;
  if(_.isEqual(trade, this.lastTrade))
    return;
  
  this.emit('trade', trade);
  this.lastTrade = trade;
}

Manager.prototype.processHistory = function(history) {
  var requiredHistory = util
    .minToMs(config.tradingAdvisor.candleSize * config.tradingAdvisor.historySize);

  if(!this.exchange.providesHistory) {
    if(history.empty) {
      // we don't have any history yet
      log.info('No history found, starting to build one now');
      var startAt = utc().add('ms', requiredHistory);
      log.info(
        'Expected to start giving advice',
        startAt.fromNow(),
        '(' + startAt.format('YYYY-MM-DD HH:mm:ss') + ' UTC)'
      );
    } else if(!history.complete) {
      // we do have history but it's not complete
      log.debug('History found, but not enough to start giving advice');
      log.info(
        'I have history since',
        history.start.fromNow(),
        '(' + history.start.format('YYYY-MM-DD HH:mm:ss') + ' UTC)'
      );
      var startAt = history.start.clone().add('ms', requiredHistory);
      log.info(
        'Expected to start giving advice', 
        startAt.fromNow(),
        '(' + startAt.format('YYYY-MM-DD HH:mm:ss') + ' UTC)'
      );
    } else {
      // we have complete history
      log.info('Full history available');
      this.emit('history', history);
    }
  }
}

Manager.prototype.fetchHistory = function(since) {
 console.log('we dont got any history, so lets fetch it!', since); 
}


// var a = new Manager;
module.exports = Manager;