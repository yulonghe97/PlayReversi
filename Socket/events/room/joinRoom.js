const { joinRoom } = require("../../../controller/room/index");

module.exports = function (socket, io) {
  socket.on("joinRoom", async (data) => {
    try {

      const [currentRoomId, userId] = [data.roomId, data.userId];

      // Bind userId
      socket.user_id = userId;
      // Bind room to socket
      socket.user_room = currentRoomId;

      // Saving Player to ROOM database
      const roomInfo = await joinRoom(userId, currentRoomId);
      if(roomInfo) socket.join(currentRoomId);

      // Send Room Info
      io.in(currentRoomId).emit("joinRoom", { roomInfo: roomInfo })

      // Request to update the room List
      socket.emit("updateRoomList");

    } catch (e) {
      socket.emit("errormsg", { message: e.message });
      console.error(e);
    }
  });
};
