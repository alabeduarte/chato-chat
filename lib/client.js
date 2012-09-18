function Client(socket) {
  this.socket = socket;
  this.emitter = Client.emitter;
  this.nickname = "user#" + (++Client.count);

  this.socket.on("data", this.onData.bind(this));
  this.socket.on("close", this.onClose.bind(this));

  this.onMessage = this.onMessage.bind(this);

  this.emitter.on("message", this.onMessage.bind(this));
  this.emit("message", this.nickname + " has joined this room" + "\n");
}
Client.count = 0;
Client.emitter = new process.EventEmitter();

Client.prototype.emit = function() {
  this.emitter.emit.apply(this.emitter, arguments);
}

Client.prototype.write = function(message) {
  this.socket.write(message);
}

Client.prototype.onMessage = function(message) {
  this.write(message + "\n");
};

Client.prototype.onClose = function() {
  this.socket.removeAllListeners("data");
  this.socket.removeAllListeners("close");
  this.emitter.removeListeners("message", this.onMessage);
  this.emit("message", this.nickname + " has left this room" + "\n");
}

Client.prototype.onData = function(message) {
  message = this.nickname + "> " + message.toString().trim();
  this.emitter.emit("message", message);
};

module.exports = {
  create: function(socket) {
    new Client(socket);
  }
};
