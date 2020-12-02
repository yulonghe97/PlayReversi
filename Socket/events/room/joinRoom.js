const log = require("../../../utils/log");
const { joinRoom, findRoom } = require("../../../controller/room/index");
const { getUserInfo } = require("../../../controller/user/index");
const { checkConnect } = require("../../../controller/connect/index");

module.exports = function (socket, io) {
  socket.on("joinRoom", async (data) => {
    try {
      const [currentRoomId, userId] = [data.roomId, data.userId];

      // Check if room is full
      const rooms = io.sockets.adapter.rooms;
      const currentRoom = rooms[currentRoomId];
      if (currentRoom) {
        if (currentRoom.length === 2) {
          throw new Error("Room is Full");
        }
      }

      // Bind userId
      socket.user_id = userId;
      // Bind room to socket
      socket.user_room = currentRoomId;

      // Check if the user already has connection
      const isSid = await checkConnect(userId, socket.id);
      if (isSid.exist) {
        socket.to(isSid.sid).emit("sessionExpired", { newSid: socket.id });
      }

      // Find User By Id
      // const user = await getUserInfo(userId);

      // Join Room
      await joinRoom(userId, currentRoomId);
      socket.join(currentRoomId);

      // Find Room Info
      const roomInfo = await findRoom(currentRoomId);
      if (!roomInfo.data) throw new Error(roomInfo.error);

      // Send Room Info
      socket.to(currentRoomId).emit("joinRoom", { data: roomInfo.data });
      socket.emit("joinRoom", { data: roomInfo.data });

      // Request to update the room List
      socket.emit("updateRoomList");
    } catch (e) {
      socket.emit("joinRoom", {
        message: "Unable to join room",
        error: e.message,
      });
      socket.emit("errormsg", { message: e.message })
      console.error(e.message);
    }
  });
};
