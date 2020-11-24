const router = require("express").Router();
const verify = require("../verifyToken");
const Room = require("../../model/Room");
const rand = require("../../utils/random");
const log = require("../../utils/log");

router.post("/createRoom", async (req, res) => {
  const id = rand.generateRoomId();

  // Save New Room to database
  const newRoom = await new Room({
    roomId: id,
    currentPlayers: req.body.user,
  }).save();

  log(`New Room Created: ${newRoom.roomId}`, "success");

  res.status(200).json(newRoom);
});

module.exports = router;
