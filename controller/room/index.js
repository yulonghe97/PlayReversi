const RoomModel = require("../../model/Room");
const UserModel = require("../../model/User");
const log = require("../../utils/log");
const { deleteSid } = require('../connect/index');

async function joinRoom(userId, roomId) {
  try {
    // Update Room
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
    // if (!currentRoom) throw e;
    // Update User
    const res = await UserModel.findByIdAndUpdate(userId, { currentRoom: roomId }, { new: true});
    log(
      `[USER JOIN]: ${userId} Joined ROOM: ${roomId}`,
      "success"
    )
    return currentRoom;
  } catch (e) {
    console.log(e);
    log(`[USER JOIN]: ${userId} unable to join ${roomId}`, "error");
    return { success: false, message: "Unable To Join Room" };
  }
}

async function destroyRoom(roomId){
  try{
    await RoomModel.deleteOne({roomId: roomId});
    log(`[ROOM DESTROY]: ${roomId} destroyed`, "success");
  }catch(e){
    log(`[ROOM DESTROY]: ${roomId} ${e.message}`, "error");
  }
}

async function leaveRoom(userId, roomId) {
  try {
    await UserModel.findByIdAndUpdate(userId, { currentRoom: "" });
    // await deleteSid(userId);
    const conditions = {
      roomId: roomId,
    };
    const update = {
      $pull: { currentPlayers: userId },
    };
    const currentRoom = await RoomModel.findOneAndUpdate(conditions, update, {
      new: true,
    }).lean();
    // If Current Room has nobody, then destroy the room
    if(currentRoom && currentRoom.currentPlayers.length === 0) destroyRoom(roomId);
    // Update User Status
    log(`[USER LEFT]: ${userId} Leaved Room ${roomId}`, "success");
    // if(!currentRoom) return null;

    return currentRoom;
  } catch (e) {
    console.log(e);
    log(`[USER LEFT]: ${userId} unable to leave ${roomId}`, "error");
    return { success: false, message: "Unable To Leave Room" };
  }
}


exports.joinRoom = joinRoom;
exports.leaveRoom = leaveRoom;
