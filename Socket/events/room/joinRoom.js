const log = require("../../../utils/log");
const { joinRoom  } = require("../../../controller/room/index");
const { getUserInfo } = require("../../../controller/user/index");

module.exports = function (socket) {
  socket.on("joinRoom", async (data) => {
    try {
      const [currentRoomId, userId] = [data.roomId, data.userId];
      // Find User By Id
      const user = await getUserInfo(userId);
      // Join Room
      socket.join(currentRoomId);
      const room = await joinRoom(userId, currentRoomId);
      log(
        `USER: ${user.name} with ID: ${userId} Joined ROOM: ${data.roomId}`,
        "success"
      );
    } catch (e) {
      console.error(e);
      socket.emit("joinRoom", { status: 500, message: e.message });
    }
  });
};
