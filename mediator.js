var url = require('url');
function local(origin) {
  var hostname = url.parse(origin).hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}
module.exports = function (options) {
  options = options || {};
  if (!options.server) {
    options.port = options.port || 9999;
    options.host = options.host || '0.0.0.0';
  }
  var WebSocketServer = require('ws').Server;
  var wss = new WebSocketServer(options);
  var lastActiveSlide = 0;
  wss.on('connection', function (ws) {
    var origin = ws.upgradeReq.headers.origin;
    if (!local(origin)) {
      ws.send(lastActiveSlide);
    }
    
    ws.on('message', function (activeSlide) {
      if (!local(origin)) { return; }
      
      lastActiveSlide = activeSlide;
      wss.clients.filter(function (s) {
        return s !== ws;
      }).forEach(function (s) {
        s.send(activeSlide)
      });
    });
  });
}