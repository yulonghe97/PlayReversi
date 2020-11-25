const log = require("../../../utils/log");
const { joinRoom  } = require("../../../controller/room/index");
const { getUserInfo } = require("../../../controller/user/index");
const { checkConnect } = require("../../../controller/connect/index");

module.exports = function (socket) {
  socket.on("joinRoom", async (data) => {
    try {
      // Bind userId, room to Socket
      socket.user_id = data.userId;
      socket.user_room = data.roomId;

      // Check if the user already has connection
      const isSid = await checkConnect(data.userId, socket.id);
      if(isSid.exist){
        console.log("Exist!");
        socket.to(isSid.sid).emit('sessionExpired', { newSid: socket.id });
      }

      const [currentRoomId, userId] = [data.roomId, data.userId];
      // Find User By Id
      const user = await getUserInfo(userId);
      // Join Room
      socket.join(currentRoomId);
      socket.emit("joinRoom", {success: true, data: user})
      await joinRoom(userId, currentRoomId);
    } catch (e) {
      socket.emit("joinRoom", { status: 500, message: e.message });
      console.error(e.message);
    }
  });
};
