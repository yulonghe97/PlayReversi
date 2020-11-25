const log = require("../../../utils/log");
const { leaveRoom } = require("../../../controller/room/index");;
module.exports = function(socket){
    socket.on("leaveRoom", async (data) => {
        try {
          const room = await leaveRoom(data.userId, data.roomId);
          console.log(room);
          socket.to(data.roomId).emit("leaveRoom", room);
          log(`USER ${data.userId} Leaved Room ${data.roomId}`);
        } catch (e) {
          log(e.message, "error");
        }
      });
}