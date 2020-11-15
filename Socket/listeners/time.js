module.exports = function (io) {
  io.on("time", function (socket) {
    console.log('resquested for time');
  });
};



// /*
//     Function to Test Socket.io
// */
// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", {'time': response.toLocaleString()});
// };