function Client(socket) {
  this.socket = socket;
  this.nickname = "user#" + (++Client.count);
  this.socket.on("data", this.onData.bind(this));
  this.write("");
}
Client.count = 0;

Client.prototype.write = function(message) {
  this.socket.write(this.nickname + "> " + message.toString());
}

Client.prototype.onData = function(message) {
  this.write(message);
};

module.exports = {
  create: function(socket) {
    new Client(socket);
  }
};
