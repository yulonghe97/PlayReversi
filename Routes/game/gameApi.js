const router = require("express").Router();
const game = require("../../Game/app");
const rand = require("../../utils/random");

// Game Model
const Game = require("../../model/Game");

router.get("/initializeGame", async (req, res) => {
  // Initialize Board with 8x8
  const board = game.IntializeGame(8, "X");
  // Generate Random Game Id
  const gameId = "G-" + rand.generateRoomId();
  res.json({
    message: "Success",
    gameInfo: { gameId: gameId, board: board },
  });
});


module.exports = router;
