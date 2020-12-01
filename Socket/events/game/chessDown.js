const game = require("../../../controller/game");
const log = require("../../../utils/log");

module.exports = function (socket) {
  socket.on("chessDown", async (data) => {
     console.log(data);
  });
};
