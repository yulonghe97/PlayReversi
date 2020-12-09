const game = require("../../../controller/game");

module.exports = function (socket) {
  socket.on("gameEnd", async (data) => {
    try {
      const result = await game.gameEnd(data.gameId, data.roomId);
      if (!result.winner && !result.draw) {
        throw new Error(result.message);
      }
      socket.emit("gameEnd", { data: result });
      socket.to(socket.user_room).emit("gameEnd", { data: result });
    } catch (e) {
      socket.emit("errormsg", { message: e.message });
    }
  });
};
