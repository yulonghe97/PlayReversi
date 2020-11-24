const RoomModel = require("../../model/Room");
const UserModel = require("../../model/User");
const log = require("../../utils/log");

async function joinRoom(userId, roomId) {
  try {
    const conditions = {
      roomId: roomId,
      currentPlayers: { $ne: userId },
    };
    const update = {
      $push: { currentPlayers: userId },
    };
    const currentRoom = await RoomModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
    if (!currentRoom) throw e;
    return currentRoom;
  } catch (e) {
    log(`${userId} unable to join ${roomId}`, "error");
    return { success: false, message: "Unable To Join Room" };
  }
}

async function leaveRoom(userId, roomId) {
  try {
    const conditions = {
      roomId: roomId,
    };
    const update = {
      $pull: { currentPlayers: userId },
    };
    const currentRoom = await RoomModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
    if (!currentRoom) throw e;
    return currentRoom;
  } catch (e) {
    log(`${userId} unable to leave ${roomId}`, "error");
    return { success: false, message: "Unable To Leave Room" };
  }
}

exports.joinRoom = joinRoom;
exports.leaveRoom = leaveRoom;
