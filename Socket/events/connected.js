const connectedEvent = (socket) => {

  require("./disconnect")(socket);
  require("./room/joinRoom")(socket);
  require("./room/leaveRoom")(socket);
  require("./game/joinGame")(socket);
  require("./game/initializeGame")(socket);

};

module.exports = connectedEvent;
