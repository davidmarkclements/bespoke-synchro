var url = require('url');

module.exports = function (options) {
  function local(origin, ws) {
    var hostname = url.parse(origin).hostname;
    var isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    if (!local.primary) { 
      local.primary = ws; 
      local.primary.on('close', function () { 
        local.primary = null;
      });
    }
    return {
      local: isLocal,
      primary: local.primary
    }
  }

  options = options || {};
  if (!options.server) {
    options.port = options.port || 9999;
    options.host = options.host || '0.0.0.0';
    options.control = options.control || local;
  }
  var control = options.control;
  var WebSocketServer = require('ws').Server;
  var wss = new WebSocketServer(options);
  var lastActiveSlide = 0;
  wss.on('connection', function (ws) {
    var origin = ws.upgradeReq.headers.origin;
    var ctrl = control(origin, ws, wss.clients);    
    if (ws !== ctrl.primary) {
      ws.send(lastActiveSlide);
    }
    
    ws.on('message', function (activeSlide) {
      if (!ctrl.local) { return; }      
      lastActiveSlide = activeSlide;
      wss.clients.filter(function (s) {
        return s !== ws;
      }).forEach(function (s) {
        s.send(activeSlide)
      });
    });
  });
}