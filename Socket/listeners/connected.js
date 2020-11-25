const connectedEvent = require("../events/connected");
const disconnectEvent = require("../events/disconnected");
module.exports = function (io) {
  io.on("connection", function (socket) {
    connectedEvent(socket);
    // disconnectEvent(socket);
  });
};
