const connectedEvent = (socket, io) => {

  require("./disconnect")(socket);
  require("./room/joinRoom")(socket, io);
  require("./room/leaveRoom")(socket);
  require("./room/showRoomList")(socket);
  require("./game/joinGame")(socket);
  require("./game/initializeGame")(socket);
  require("./game/chessDown")(socket);
  require("./game/availableMoves")(socket);
  require("./game/gameEnd")(socket);
  require("./room/broadcastRoom")(socket, io);

};

module.exports = connectedEvent;
