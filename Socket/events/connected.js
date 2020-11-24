const Game = require("../../Game/app");
const User = require("../../Game/user");
const log = require("../../utils/log");
const { joinRoom, leaveRoom } = require("../../controller/room/index");

let rooms = {};

const connectedEvent = (socket) => {
  socket.on("joinRoom", async (data) => {
    try {
      const [currentRoomId, userId] = [data.roomId, data.userId];
      // Find User By Id
      const user = await User.findUser(userId);
      // Join Room
      socket.join(currentRoomId);
      const room = await joinRoom(userId, currentRoomId);
      log(
        `USER: ${user.name} with ID: ${userId} Joined ROOM: ${data.roomId}`,
        "success"
      );
      console.log(room);
      // Register User to Room
      // User.registerUser(rooms, {
      //   user: user,
      //   socketId: socket.id,
      //   room: currentRoomId,
      // });
      // log(
      //   `USER: ${user.name} with ID: ${userId} Joined ROOM: ${data.roomId}`,
      //   "success"
      // );
      // socket.to(currentRoomId).emit("joinRoom", rooms[currentRoomId]);
      // socket.emit("joinRoom", rooms[currentRoomId]);
      // console.log(rooms);
    } catch (e) {
      console.error(e);
      socket.emit("joinRoom", { status: 500, message: e.message });
    }
  });

  socket.on("leaveRoom", (data) => {
    try {
      // rooms[data.roomId] = rooms[data.roomId].filter(
      //   (e) => e.username !== data.user
      // );
      leaveRoom(data.userId, data.roomId);
      socket.to(data.roomId).emit("leaveRoom", rooms[data.roomId]);
      log(`USER ${data.user} Leaved Room ${data.roomId}`);
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
