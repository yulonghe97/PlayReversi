const Game = require("../../Game/app");

const connectedEvent = (socket, io) => {
  socket.on("joinRoom", (data) => {
    try{
      const currentRoomId = data.roomId
      socket.join(currentRoomId); 
      console.log(`USER: ${socket.id} Joined ROOM: ${data.roomId}`)
      socket.emit('joinRoom', { status: 200, roomId:currentRoomId, message: `Room ${data.roomId} Joined Successfully`})
      console.log(socket.adapter.rooms[`${currentRoomId}`])
    }catch(e){
      console.error(e);
      socket.emit('joinRoom', { status: 500, message: e.message})
    }
  });
  // Do some interesting thing inside of this place!
  // socket.emit("socker", { socket /* Some other interesting data, maybe*/ });
  socket.on("chessDown", (data) => {
    console.log(data);
  });
  socket.on("initializeGame", (data) => {
    const gameInfo = Game.IntializeGame(8, "X");
    socket.emit("initializeGame", gameInfo);
  });
};

module.exports = connectedEvent;
