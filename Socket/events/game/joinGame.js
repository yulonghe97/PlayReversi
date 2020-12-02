const log = require("../../../utils/log");
const game = require("../../../controller/game");

module.exports = function (socket) {
  socket.on("joinGame", async (req) => {
    try{
    const res = await game.addPlayerToGame(req.gameId, socket.user_id);
    socket.emit("joinGame", res);
    socket.to(socket.user_room).emit("joinGame", res);
    }catch(e){
      socket.emit("errormsg", { message: e.message });
    }
  });
};
