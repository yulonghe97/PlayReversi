module.exports = function (io) {
  io.on("test", function (socket) {
    socket.on("test", (id, msg) => console.log(id, msg))
  });
};
