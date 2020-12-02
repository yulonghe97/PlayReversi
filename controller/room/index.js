const { func } = require("joi");
const RoomModel = require("../../model/Room");
const UserModel = require("../../model/User");
const log = require("../../utils/log");
const { deleteSid } = require("../connect/index");

/**
 * Find Room Info by Room Code
 *
 * @param   {String}  roomCode  eg. 'XDMFS'
 *
 * @return  {Object}  Room Info
 */
async function findRoom(roomCode) {
  try {
    const room = await RoomModel.findOne({ roomId: roomCode })
      .populate("currentPlayers")
      .exec();
    return { data: room };
  } catch (e) {
    return { message: "Fail to Find Room", error: e.message };
  }
}


// return a list of rooms that are active
async function findActiveRoom() {
  try {
    const room = await RoomModel.find({ isActive: true })
      .populate("currentPlayers")
      .exec();
    return { data: room };
  } catch (e) {
    return { message: "Fail to find active rooms", error: e.message };
  }
}

//check if the room is full
async function isFull(roomCode) {
  try {
    const room = await RoomModel.findOne({ roomId: roomCode })
    if (room.currentPlayers.length === 2) {
      return true;
    } 
    else {
      return false;
    }
  } catch (e) {
    return { message: "Connot decide it is full or not", error: e.message };
  }
}


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
    }).lean().exec();
    // If room exist, and user never joined before, then join the room

    // Update User
    const res = await UserModel.findByIdAndUpdate(
      userId,
      { currentRoom: roomId },
      { new: true }
    );
    log(`[USER JOIN]: ${userId} Joined ROOM: ${roomId}`, "success");

    return currentRoom;
  } catch (e) {
    console.log(e);
    log(`[USER JOIN]: ${userId} unable to join ${roomId}`, "error");
    return { message: "Unable To Join Room", error: e.message };
  }
}

async function destroyRoom(roomId) {
  try {
    await RoomModel.deleteOne({ roomId: roomId });
    log(`[ROOM DESTROY]: ${roomId} destroyed`, "success");
  } catch (e) {
    log(`[ROOM DESTROY]: ${roomId} ${e.message}`, "error");
  }
}

async function leaveRoom(userId, roomId) {
  try {
    // Delete Room from user
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
    })
      .populate('currentPlayers')
      .lean()
      .exec();
    // If Current Room has nobody, then destroy the room
    if (currentRoom && currentRoom.currentPlayers.length === 0)
      destroyRoom(roomId);
    // Update User Status
    log(`[USER LEFT]: ${userId} Leaved Room ${roomId}`, "success");
    // if(!currentRoom) return null;

    return currentRoom;
  } catch (e) {
    console.log(e);
    log(`[USER LEFT]: ${userId} unable to leave ${roomId}`, "error");
    return { message: "Unable To Leave Room", error: e.message };
  }
}

exports.joinRoom = joinRoom;
exports.leaveRoom = leaveRoom;
exports.findRoom = findRoom;
