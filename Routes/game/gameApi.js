const router = require("express").Router();
const game = require("../../Game/app");

router.get("/initializeGame", (req, res) => {
  // Initialize Board with 8x8
  const board = game.IntializeGame(8, "X");
  res.json({
    message: "Success",
    gameInfo: { gameId: "XUIDJ", board: board },
  });
});


module.exports = router;
