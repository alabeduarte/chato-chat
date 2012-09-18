function Client(socket) {
  this.socket = socket;
  this.nickname = "user#" + (++Client.count);

  this.socket.on("data", this.onData.bind(this));
  Client.emitter.on("message", this.onMessage.bind(this));
}
Client.count = 0;
Client.emitter = new process.EventEmitter();

Client.prototype.onMessage = function(message) {
  this.write(message);
};

Client.prototype.write = function(message) {
  this.socket.write(message);
}

Client.prototype.onData = function(message) {
  message = this.nickname + "> " + message.toString();
  Client.emitter.emit("message", message);
};

module.exports = {
  create: function(socket) {
    new Client(socket);
  }
};
