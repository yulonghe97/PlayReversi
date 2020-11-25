const Game = require("../../Game/app");
const log = require("../../utils/log");
const { joinRoom, leaveRoom } = require("../../controller/room/index");;

let rooms = {};

const connectedEvent = (socket) => {

  require("./room/joinRoom")(socket);
  require("./room/leaveRoom")(socket);

  socket.on("chessDown", (data) => {
    // console.log(data);
  });

  socket.on("initializeGame", (data) => {
    const gameInfo = Game.IntializeGame(8, "X");
    socket.emit("initializeGame", gameInfo);
  });


  socket.on("disconnect", (data) => {
    console.log(socket.id + " disconnect")
  })
};

module.exports = connectedEvent;
