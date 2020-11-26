const Game = require("../../Game/app");
const log = require("../../utils/log");
const { leaveRoom } = require("../../controller/room/index");
const { checkSid } = require("../../controller/connect/index");

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

  socket.on("disconnect", async () => {
    try {
      // Check if it's the valid socket to leave the room
      if (socket.user_id) {
        const isValid = await checkSid(socket.user_id, socket.id);
        if (socket.user_room && isValid) {
          const room = await leaveRoom(socket.user_id, socket.user_room);
          socket.to(socket.user_room).emit("leaveRoom", { data: room });
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = connectedEvent;
