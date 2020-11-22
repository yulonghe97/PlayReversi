const Game = require("../../Game/app");
const User = require("../../Game/user");
const chalk = require("chalk");

let rooms = {};

const connectedEvent = (socket, io) => {

  socket.on("joinRoom", (data) => {
    try {
      const [currentRoomId, currentUser] = [data.roomId, data.user];
      // Join Room
      socket.join(currentRoomId);
      // Register User
      User.registerUser(rooms, {
        username: currentUser,
        socketId: socket.id,
        room: currentRoomId,
      });
      console.log(
        chalk.greenBright(`USER: ${currentUser} Joined ROOM: ${data.roomId}`)
      );
      socket.to(currentRoomId).emit("joinRoom", rooms[currentRoomId]);
      socket.emit("joinRoom", rooms[currentRoomId]);
    } catch (e) {
      console.error(e);
      socket.emit("joinRoom", { status: 500, message: e.message });
    }
  });

  socket.on("leaveRoom", (data) => {
    try {
      rooms[data.roomId] = rooms[data.roomId].filter(
        (e) => e.username !== data.user
      );
      socket.to(data.roomId).emit("leaveRoom", rooms[data.roomId]);
      console.log(chalk.red(`USER ${data.user} Leaved Room ${data.roomId}`));
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("chessDown", (data) => {
    // console.log(data);
  });


  socket.on("initializeGame", (data) => {
    const gameInfo = Game.IntializeGame(8, "X");
    socket.emit("initializeGame", gameInfo);
  });


};

module.exports = connectedEvent;
