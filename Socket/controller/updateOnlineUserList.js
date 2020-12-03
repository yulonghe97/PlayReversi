// TODO: Consider the run time
function updateOnlineUserList(io) {
  const currentUserList = Object.values(io.sockets.sockets).map((e) => {
    if (e.user) return e.user;
  });
  // Update other online user lists
  io.emit("updateOnlineUserList", currentUserList);
}

module.exports = updateOnlineUserList;
