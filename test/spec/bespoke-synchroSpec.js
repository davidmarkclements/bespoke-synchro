describe("bespoke-synchro", function() {

  Function.prototype.bind = Function.prototype.bind || require('function-bind');
  require('simulant/simulant');

  var bespoke = require('bespoke'),
    synchro = require('../../lib-instrumented/bespoke-synchro.js');

  var deck,

    createDeck = function(optionValue) {
      var parent = document.createElement('article');
      parent.innerHTML = '<section></section><section></section>';

      deck = bespoke.from(parent, [
        keys(optionValue)
      ]);
    },

    pressKey = function(which) {
      simulant.fire(document, 'keydown', { which: which });
    };

});
