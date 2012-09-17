var net = require("net");

net.createServer(function(socket) {
  socket.write("Hello there!");

  socket.on("data", function(message) {
    console.log(message.toString());
  });
}).listen(7777);
