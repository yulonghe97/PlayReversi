const log = require("../../../utils/log");
const game = require("../../../controller/game");

module.exports = function (socket) {
    // TODO : RECONNECT BUG
  socket.on("reConnectToGame", async (req) => {
    try{
    const res = await game.getGameInfo(req.gameId);
    socket.emit("reConnectToGame", {data: res});
    }catch(e){
        console.log(e);
      socket.emit("errormsg", { message: e.message });
    }
  });
};
