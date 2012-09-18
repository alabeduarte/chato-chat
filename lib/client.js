function Client(socket) {
  this.socket = socket;
  this.socket.on("data", this.onData.bind(this));
}

Client.prototype.onData = function(message) {
  console.log(message);
};

module.exports = {
  create: function(socket) {
    new Client(socket);
  }
};
