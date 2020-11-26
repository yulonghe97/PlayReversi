const log = require("../../../utils/log");
const { leaveRoom } = require("../../../controller/room/index");
module.exports = function (socket) {
  socket.on("leaveRoom", async (data) => {
    try {
      socket.leave(socket.user_room);
      socket.user_room = null;
      const room = await leaveRoom(data.userId, data.roomId);
      socket.to(data.roomId).emit("leaveRoom", { data: room });
    } catch (e) {
      log(e.message, "error");
    }
  });
};
