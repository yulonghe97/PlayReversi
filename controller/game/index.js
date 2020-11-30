const game = require("../../Game/app");
const rand = require("../../utils/random");
const gameModel = require("../../model/Game");
const roomModel = require("../../model/Room");
const log = require("../../utils/log");

/**
 * Assign Letter And Return
 *
 */
function assignLetter(playerId) {
  const letter = Math.random() < 0.5 ? "X" : "O";
  return letter === "X" ? { Xplayer: playerId } : { Oplayer: playerId };
}

/**
 * Initialize Game
 * @param   {String}  currentPlayerId  user _id
 * @param   {String}  roomId           room _id
 * @return  {Object}  Saved Game Info
 */
async function initializeGame(currentPlayerId, roomId) {
  const board = game.IntializeGame(8, "X");
  const gameId = "G-" + rand.generateRoomId();
  const newGame = new gameModel({
    gameId: gameId,
    board: board,
    gameSides: assignLetter(currentPlayerId),
  });
  // Save Game into Database
  try {
    const savedGame = await newGame.save();
    await roomModel.findByIdAndUpdate(roomId, { gameId: savedGame._id });
    return { message: "Game Initialized", data: savedGame };
  } catch (e) {
    return { message: "Failed to initialize Game", error: e.message };
  }
}

async function addPlayerToGame(gameId, currentPlayerId) {
  try {
    if (isPlayerInGame(currentPlayerId, gameId)) {
      const update = {
        $push: { currentPlayers: currentPlayerId },
      };
      const game = await gameModel.findByIdAndUpdate(gameId, update, { new: true} );
      return { message: "Player Added to Game", data: game };
    } else {
      return { message: "Player Already in Game", error: 'PlayerInGame' };
    }
  } catch (e) {
    return { message: "Failed to add player", error: e.message };
  }
}

async function isPlayerInGame(currentPlayerId, gameId) {
  try {
    const game = await gameModel.findById(gameId).lean().exec();
    return Boolean(game.currentPlayers.includes(currentPlayerId));
  } catch (e) {
    return false;
  }
}

module.exports = {
  initializeGame: initializeGame,
  addPlayerToGame: addPlayerToGame,
};
