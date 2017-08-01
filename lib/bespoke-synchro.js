module.exports = function(options) {
  function synchro(deck) {
    options = options || {};

    var control = options.control || local;
    var port = options.port || ~~(location.search.split('?')[1]) || 9999;
    var url = options.url || (/https/.test(location.protocol) ? 'wss' : 'ws') 
      + '://' + (location.hostname || 'localhost');

    var path = options.path ? options.path : '';
    url += ':' + port + '/' + path;

    function local(origin) {
      var parse = document.createElement('a');
      parse.href = origin;
      var hostname = parse.hostname;
      return {
        local: hostname === 'localhost' || hostname === '127.0.0.1'
      }
    }

    var socket = new WebSocket(url);

    function synch() { 
      var synchronizing = synch.ronizing;
      synch.ronizing = false;
      return synchronizing;
    }

    function passToWS (n,e) {
      if (socket.readyState !== 1) {return;}
      if (synch()) {return;}
      if (!control(url, socket).local) {return;}
      if (!synchro.sending) { return; }
      e.eventname = n 

      socket.send(JSON.stringify(e)); 
    }

    deck.on('activate', function (e) {passToWS('activate', e);});
    deck.on('next', function (e) {passToWS('next', e);});
    deck.on('prev', function (e) {passToWS('prev', e);});

    socket.onmessage = function (e) {
      if (!synchro.receiving) {return;}
      synch.ronizing = true;
      ev = JSON.parse(e.data)
      if (ev.eventname == 'next') {deck.next();};
      if (ev.eventname == 'prev') {deck.prev();};
      if (ev.eventname == 'activate' && deck.slide() != ev.index) {
          deck.slide(ev.index);
      };
      
    };

  };

  synchro.receiving = true;
  synchro.sending = true;

  function disable() { disable.rx(); disable.tx() }
  disable.rx = function () { 
    synchro.receiving = false
  }
  disable.tx = function () { 
    synchro.sending = false
  }

  function enable() { enable.rx(); enable.tx() }
  enable.rx = function () {
    synchro.receiving = true
  }
  enable.tx = function () {
    synchro.sending = true
  }

  function toggle() { toggle.rx(); toggle.tx() }
  toggle.rx = function () { 
    synchro.receiving = !synchro.receiving
  }
  toggle.tx = function () {
    synchro.sending = !synchro.sending
  }


  synchro.disable = disable;
  synchro.enable = enable;
  synchro.toggle = toggle;
  
  return synchro;
};
