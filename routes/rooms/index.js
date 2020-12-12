const router = require("express").Router();
const verify = require("../verifyToken");
const Room = require("../../model/Room");
const rand = require("../../utils/random");
const log = require("../../utils/log");

router.post("/createRoom", verify, async (req, res) => {
  const id = rand.generateRoomId();

  // Save New Room to database
  const newRoom = await new Room({
    roomId: id,
    roomHost: req.body.userId,
  }).save();

  log(`[NEW ROOM]: ${newRoom.roomId}`, "success");

  res.status(200).json(newRoom);
});

module.exports = router;
