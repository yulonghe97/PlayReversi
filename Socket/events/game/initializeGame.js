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
        // Add the host to game
        const gameRes = await game.addPlayerToGame(res.data._id, socket.user_id);
        socket.to(roomCode).emit("playerCanJoin", gameRes);
      }catch(e){
        socket.emit("errormsg", { message: e.message });
        log(e.message, "error");
      }
  });
};
