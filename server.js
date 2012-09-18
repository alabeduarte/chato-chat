var net = require("net")
  , Client = require("./lib/client")
;

net.createServer(function(socket) {
  var client = Client.create(socket);
}).listen(7777);
