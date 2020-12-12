const { checkRoom } = require("../../../controller/room/index");
const { checkConnect } = require("../../../controller/connect/index");

module.exports = function (socket, io) {
  socket.on("checkRoomStatus", async (req) => {
    try {
      if (!req.roomCode) throw new Error("Invalid Room Code");
      const { status, roomInfo } = await checkRoom(req.roomCode, req.playerId);
      switch (status) {
        case -1:
          throw new Error("Invalid Room");
        case -11:
          throw new Error("Room is Full");
        case 0:
          socket.emit("roomStatus", 0);
          break;
        case 1:
          socket.emit("roomStatus", 1);
          break;
        case 11:
           // Player Saved To Database, Join Directly  
           // Disconnect Another Socket
          const isSid = await checkConnect(req.playerId, socket.id);
          if (isSid.exist) {
            socket.to(isSid.sid).emit("sessionExpired");
            console.log(isSid);
          }
          socket.join(req.roomCode);
          socket.emit("roomStatus", 11);
          io.in(req.roomCode).emit("joinRoom", { roomInfo: roomInfo });
          // Request to update the room List
          socket.emit("updateRoomList");
          break;
        default:
          throw new Error("Unknown Room Status");
      }
    } catch (e) {
      // Display Error Message In Client Side
      socket.emit("errormsg", { message: e.message });
    }
  });
};
