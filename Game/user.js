// For testing purpose, without any database connection

function registerUser(rooms, newUser) {
  const roomId = newUser.room;

  // Check Rooms
  if (rooms.hasOwnProperty(newUser.room)) {
    // Check Users
    if (CheckUserExist(rooms[roomId], newUser) === false) {
      rooms[newUser.room] = [
        ...rooms[newUser.room],
        {
          username: newUser.username,
          socketId: newUser.socketId,
          room: newUser.room,
        },
      ];
    }
  } else {
    rooms[newUser.room] = [
      {
        username: newUser.username,
        socketId: newUser.socketId,
        room: newUser.room,
      },
    ];
  }
}

function CheckUserExist(room, user) {
  for (let i = 0; i < room.length; i++) {
    if (room[i].username === user.username) {
      // Change the Socket Id
      room[i].socketId = user.socketId;
      return true;
    }
  }
  return false;
}

module.exports = {
  registerUser: registerUser,
};
