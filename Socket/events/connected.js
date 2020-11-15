const Game = require  ("../../Game/app");


const connectedEvent = (socket) => {
  // Do some interesting thing inside of this place!
  // socket.emit("socker", { socket /* Some other interesting data, maybe*/ });
  socket.on("test", (data) => {
    console.log(data);
  });
  socket.on("chessDown", (data) => {
    console.log(data);
  })
  socket.on("initializeGame", (data) => {
    const gameInfo = Game.IntializeGame(8, 'X');
    socket.emit("initializeGame", gameInfo)
  })
};
module.exports = connectedEvent;
