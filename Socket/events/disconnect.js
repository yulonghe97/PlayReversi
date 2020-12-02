const { leaveRoom } = require("../../controller/room/index");
const { checkSid } = require("../../controller/connect/index");

module.exports = function (socket) {
  socket.on("disconnect", async () => {
    try {
      // Check if it's the valid socket to leave the room
      if (socket.user_id) {
        const isValid = await checkSid(socket.user_id, socket.id);
        if (socket.user_room && isValid) {
          const room = await leaveRoom(socket.user_id, socket.user_room);
          socket.to(socket.user_room).emit("leaveRoom", { data: room });
        }
      }
    } catch (e) {
      log(e.message, "error")
    }
  });
};
