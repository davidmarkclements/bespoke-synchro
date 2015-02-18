module.exports = function (options) {
  options = options || {};
  options.port = options.port || 9999;
  var WebSocketServer = require('ws').Server;
  var wss = new WebSocketServer(options);
  var lastActiveSlide = 0;
  wss.on('connection', function (ws) {
    if (wss.clients.indexOf(ws) > 0) {
      ws.send(lastActiveSlide);
    }

    ws.on('message', function (activeSlide) {
      if (wss.clients.indexOf(ws) > 1) { return; }
      lastActiveSlide = activeSlide;
      wss.clients.filter(function (s) {
        return s !== ws;
      }).forEach(function (s) {
        s.send(activeSlide)
      });
    });
  });
}