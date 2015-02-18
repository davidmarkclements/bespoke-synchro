/*!
 * bespoke-synchro v1.0.0
 *
 * Copyright 2015, David Mark Clements
 * This content is released under the  license
 * 
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var o=n;o=o.bespoke||(o.bespoke={}),o=o.plugins||(o.plugins={}),o.keys=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = function(options) {
  return function(deck) {
    options = options || {};
    var port = options.port || 9999;
    var url = options.url || 'ws://localhost:' + port; 
    var socket = new WebSocket(url);
    var unhitch = options.unhitch || 81;
    var unhitched = false;
    function synch() { 
      var synchronizing = synch.ronizing;
      synch.ronizing = false;
      return synchronizing;
    }
    document.addEventListener('keydown', function(e) {
      if (e.which === unhitch) {
        unhitched = !unhitched;
      }
    }); 
    deck.on('activate', function (e) {
      if (socket.readyState !== 1) {return;}
      if (synch()) {return;}
      socket.send(e.index);
    });

    socket.onmessage = function (e) {
      if (unhitched) {return;}
      synch.ronizing = true;
      deck.slide(+e.data);
    };
  };
};

},{}]},{},[1])
(1)
});