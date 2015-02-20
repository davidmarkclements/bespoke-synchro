module.exports = function(options) {
  return function(deck) {
    options = options || {};
    var port = options.port || 9999;
    var url = options.url || (location.protocol === 'https' ? 'wss' : 'ws') 
      + '://' + (location.hostname || 'localhost');

    var path = options.path ? options.path : '';
    url += ':' + port + '/' + path;


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
