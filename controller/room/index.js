const { func } = require("joi");
const Room = require("../../model/Room");
const { populate } = require("../../model/Room");
const RoomModel = require("../../model/Room");
const UserModel = require("../../model/User");
const log = require("../../utils/log");
const { deleteSid } = require("../connect/index");

async function findAllRooms() {
  try {
    const room = await RoomModel.find().select("roomId").lean().exec();
    return { data: room };
  } catch (e) {
    return { message: "Fail to Find Room", error: e.message };
  }
}

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

/**
 * Check and return room status
 * Status Code:
 *             -1 -> Room Does not Exist
 *            -11 -> Room is Full
 *              0 -> Room Waiting
 *              1 -> Room Ongoing
 *             11 -> Player Joined Before
 *
 * @param {String} roomCode
 */

async function checkRoom(roomCode, playerId) {
  const NO_ROOM = -1;
  const ROOM_FULL = -11;
  const ROOM_ONGOING = 1;
  const ROOM_WAITING = 0;
  const PLAYER_ALREADY_JOINED = 11;

  try {
    const room = await RoomModel.findOne({ roomId: roomCode })
      .populate("currentPlayers")
      .lean()
      .exec();

    console.log(roomCode, playerId);
    console.log(room);

    const currentPlayers = room.currentPlayers.map((e) => (e._id.toString())) || [];

    console.log(currentPlayers.includes(playerId));

    if (!room) return { status: NO_ROOM };
    if (room.currentPlayers.length === 2) return { status: ROOM_FULL };

    if (currentPlayers.includes(playerId)) {
      return { status: PLAYER_ALREADY_JOINED, roomInfo: room }; // If user is already in room, return room info
    }

    return { status: room.isOngoing ? ROOM_ONGOING : ROOM_WAITING };
  } catch (e) {
    console.error(e);
    throw new Error("Unable to Check Room");
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

async function joinRoom(userId, roomCode) {
  try {
    // Update Room
    const conditions = {
      roomId: roomCode,
    };
    const update = {
      $push: { currentPlayers: userId },
    };
    const currentRoom = await RoomModel.findOneAndUpdate(conditions, update, {
      new: true,
    })
      .populate("currentPlayers")
      .lean()
      .exec();

    // Update User
    await UserModel.findByIdAndUpdate(userId, { currentRoom: roomCode });

    log(`[USER JOIN]: ${userId} Joined ROOM: ${roomCode}`, "success");
    return currentRoom;
  } catch (e) {
    console.error(e);
    throw Error(e);
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
      isFull: false,
    };
    const currentRoom = await RoomModel.findOneAndUpdate(conditions, update, {
      new: true,
    })
      .populate("currentPlayers")
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
exports.findActiveRoom = findActiveRoom;
exports.findAllRooms = findAllRooms;
exports.destroyRoom = destroyRoom;
exports.checkRoom = checkRoom;
