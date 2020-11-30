const game = require("../../../controller/game");
const log = require("../../../utils/log");

module.exports = function (socket) {
  socket.on("initializeGame", async (data) => {
      try{
        const [userId, roomId, roomCode] = [data.userId, data.roomId, data.roomCode];
        socket.emit("onInitializing");
        socket.to(roomCode).emit("onInitializing");
        const res = await game.initializeGame(userId, roomId);
        log(`[NEW GAME] ${res.data.gameId} Initialized`, "success");
        socket.emit("initializeGame", res);
        socket.to(roomCode).emit("initializeGame", res);   
      }catch(e){
        log(e.message, "error");
      }
  });
};
