const Game = require("../../Game/app");
const log = require("../../utils/log");
const { leaveRoom } = require("../../controller/room/index");;

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


  socket.on("disconnect", async (data) => {
    // When user is in the room and lose connection
    if(socket.user_room){
      await leaveRoom(socket.user_id, socket.user_room);
    }
  })
};

module.exports = connectedEvent;
