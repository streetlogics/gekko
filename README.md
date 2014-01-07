# Important note

You are looking at the new and completetly different version of Gekko that is being developed right now. **It is not stable yet, it might crash and we need to validate the advice to be solid.**

What we know doesn't work:

- Real trading (I am not implementing this until I have validated advice).
- Watching Mt. Gox & BTCCchina.

Here is [the todo](https://github.com/askmike/gekko/issues/114) until it is considered stable.

If you encounter a bug: check out in [the issues](https://github.com/askmike/gekko/issues/114) if we are aware of it and if not create a new one :)

# Gekko

*The point is ladies and gentlemen that greed, for lack of a better word, is good.*

![Gordon Gekko](http://mikevanrossum.nl/static/gekko.jpg)

-Gordon Gekko

Gekko is a Bitcoin trading bot for popular exchanges written in javascript running on [nodejs](http://nodejs.org), it will feature multiple trading methods using technical analysis (at this moment it only knows EMA). It can monitor the live market or backtest strategies on historical data.

[![Build Status](https://travis-ci.org/askmike/gekko.png)](https://travis-ci.org/askmike/gekko)

## Main features

* Paper trading
* ~~Live trading (trade bot)~~
* ~~Backtesting~~

## What?

This project is a learning excercise of me, a student with *some* experience in programming (mostly web) and zero experience in economics and trading. I figured writing my own trade bot would be the best way to learn about implementing mathematical trading algorithms. So here is **my very first attempt at anything related to trading / algorithmic decision making**.

I'm developing Gekko fully open source in the hope of getting feedback from folks with more experience in this field. Because I not only want to attract programmers I am doing my best to make the code as readable as possible, this includes a lot of comments and probably not the most efficient (but expressive) code.

As this is a learning experience for me all feedback is extremely appreciated. If you don't want to contribute to the code you can always just send me an [email](mailto:mike@mvr.me) or leave feedback in the [Gekko thread on the bitcointalk forum](https://bitcointalk.org/index.php?topic=209149.0).

*Use Gekko at you own risk.*

### Paper & live trading 

Gekko uses Technical Analysis (only EMA at this moment) to determine when to enter or leave the live market, at such a moment it can:

* Advice on what you should do (for example per email).
* Calculate the profits of all the advices so far.
* Automatically trade.

Gekko currently supports paper ~~& live trading~~ at the following exchanges:

* ~~[Mt. Gox](https://mtgox.com/)~~
* [BTC-e](https://btc-e.com/)
* [Bitstamp](https://bitstamp.net/)
* [cex.io](https://cex.io) (commodity exchange for mining power)

### ~~Backtesting~~

~~You can also backtest strategies using Gekko. I am currently expanding and improving the backtester and I could use all the feedback I can get. Keep in mind that I currently would not suggest applying strategies for real investments based on the result, consider it alpha stage.~~

~~You can find more detailed information in the [document about Backtesting](https://github.com/askmike/gekko/blob/master/docs/Backtesting.md) as well as how to set it up.~~

## Installing Gekko

Windows user? Here is a [step-by-step guide](https://github.com/askmike/gekko/blob/master/docs/installing_gekko_on_windows.md) on how to get Gekko running on Windows.

Gekko runs on [nodejs](http://nodejs.org/), once you have that installed you can either download all files in [a zip](https://github.com/askmike/gekko/archive/master.zip) or clone the repository via git:

    git clone git://github.com/askmike/gekko.git
    cd gekko

You need to download Gekko's dependencies, which can easily be done with [npm](http://npmjs.org):

    npm install

## Configuring Gekko

To change the settings, open up and edit [config.js](https://github.com/askmike/gekko/blob/master/config.js) to change the parameters. Check out doc on [Configuring Gekko](https://github.com/askmike/gekko/blob/master/docs/Configuring_gekko.md) where everything is explained in more detail.

## Running Gekko

To run the bot you just have to start Gekko:

    node gekko

You can also run Gekko silently, for examples on how to do this check out the [advanced features](https://github.com/askmike/gekko/blob/master/docs/Advanced_features.md).

## Updating Gekko

If you installed the bot via git you can easily fetch the latest updates by running:

    git pull && npm update

## What is Gekko doing?

If you started Gekko it will remain open in your terminal and log out new information, for example:

    start time:  2013-05-19 23:17:38

    I'm gonna make you rich, Bud Fox.
    Let me show you some Exponential Moving Averages.

    2013-06-02 18:21:15 (INFO): ADVICE is to HOLD @ 117.465 (0.132)
    2013-06-02 18:21:15 (INFO): (PROFIT REPORT) original balance:    207.465 USD
    2013-06-02 18:21:15 (INFO): (PROFIT REPORT) current balance:     217.465 USD
    2013-06-02 18:21:15 (INFO): (PROFIT REPORT) profit:          10.000 USD (4.820%)

After the first fetching, every new interval (in the [config](https://github.com/askmike/gekko/blob/master/config.js#L17)) Gekko will fetch new trade data, advice on what to do and give a profit report:

### Advice

* HOLD means don't do anything, we are either not in a trend or the trend has not changed since last check.
* LONG means the trend has changed to an uptrend, advice is to buy now so we can sell at the end of the trend.
* SHORT means the trend has chacnged to a downtrend, advice is to sell now so we can buy back at the end of the trend.

After every line of advice we can see the current price Gekko calculated and the difference in EMAs, this makes it easier to understand the advice.

### Profit report

The profit report will log out Gekko's profit since it started, this is done using a buy and sell simulations (regardless if you have automatic trading enabled or not). Gekko applies the configured trading fee on both simulated sells and buys.

*If Gekko logs 20% that means that if you would have had automatic trading enabled on an exchange account with a balance of 1BTC, you would now have 1.2BTC.*

### ~~Buying and selling~~

~~If you configured Gekko to automatically sell on this information it will also log:~~

* ~~NOW going to BUY, when it is buying BTC.~~
* ~~NOW going to SELL, when it is selling BTC.~~

## TODO

* More exchanges (cryptsy, bitfinex, kraken, btcchina)
* More trading methods
* Webbased interface

## Credits

* The title is inspired by [Bateman](https://github.com/fearofcode/bateman).
* This project is inspired by the [GoxTradingBot](https://github.com/virtimus/GoxTradingBot/) Chrome plugin (though no code is taken from it).

## Final

If Gekko helped you in any way, you can always leave me a tip at (BTC) 13r1jyivitShUiv9FJvjLH7Nh1ZZptumwW

## License

The MIT License (MIT)

Copyright (c) 2013 Mike van Rossum <mike@mvr.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
