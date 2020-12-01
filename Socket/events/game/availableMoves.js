const game = require("../../../controller/game");
const rev = require("../../../Game/reversi");
const log = require("../../../utils/log");

module.exports = function (socket) {
  socket.on("availableMoves", async (data) => {
    const [board, letter] = [data.board, data.side];
    try {
      rev.boardToString(board);
      const availableMoves = game.checkAvailableMoves(board, letter);
      console.log(availableMoves);
      if (availableMoves.length > 0) {
        socket.emit("availableMoves", { data: availableMoves });
      } else {
        throw new Error("No Available Moves");
      }
    } catch (e) {
      socket.emit("errormsg", { message: "Error" });
    }
  });
};
