const game = require("../../Game/game");
const rand = require("../../utils/random");
const gameModel = require("../../model/Game");
const roomModel = require("../../model/Room");
const log = require("../../utils/log");

/**
 * Assign the player who joined the game
 *
 * @param   {[type]}  game      game object
 * @param   {[type]}  playerId  player _id
 *
 * @return  {[type]}            [return description]
 */
function assignPlayerLetter(game, playerId) {
  // If never assigned
  if (game.playerO || game.playerX !== playerId) {
    // Since the letter is assigned once the game is initialized
    // We don't need to assign twice when the host is joined
    if (game.playerO) return { playerX: playerId };
    if (game.playerX) return { playerO: playerId };
  }
}

/**
 * Assign Host Letter when the game is initializing
 *
 * @param   {[type]}  playerId  [playerId description]
 * @return  {[type]}            [return description]
 */
function assignHostLetter(playerId) {
  const seed = Math.random() < 0.5 ? 0 : 1;
  return seed === 0 ? { playerX: playerId } : { playerO: playerId };
}

/**
 * Initialize Game
 * @param   {String}  currentPlayerId  user _id
 * @param   {String}  roomId           room _id
 * @return  {Object}  Saved Game Info
 */
async function initializeGame(currentPlayerId, roomId) {
  const board = game.intializeGame(8);
  const gameId = "G-" + rand.generateRoomId();
  // Save Game into Database
  try {
    const newGame = new gameModel({
      gameId: gameId,
      board: board,
      ...assignHostLetter(currentPlayerId),
    });
    console.log(newGame);
    const savedGame = await newGame.save();
    await roomModel.findByIdAndUpdate(roomId, { gameId: savedGame._id });
    return { message: "Game Initialized", data: savedGame };
  } catch (e) {
    console.error(e);
    return { message: "Failed to initialize Game", error: e.message };
  }
}

async function addPlayerToGame(gameId, currentPlayerId) {
  try {
    const game = await gameModel.findById(gameId).lean().exec();
    // Check if player is already in game
    if (isPlayerInGame(game, currentPlayerId)) {
      return { message: "Player Already in Game", error: "PlayerInGame" };
    }
    const update = {
      $push: { currentPlayers: currentPlayerId },
      ...assignPlayerLetter(game, currentPlayerId),
    };
    console.log(JSON.stringify(update));
    const newGame = await gameModel.findByIdAndUpdate(gameId, update, {
      new: true,
    });
    console.log(newGame);
    return { message: "Player Added to Game", data: newGame };
  } catch (e) {
    return { message: "Failed to add player", error: e.message };
  }
}

function isPlayerInGame(game, currentPlayerId) {
  return Boolean(game.currentPlayers.includes(currentPlayerId));
}

function makeMove(){
  
}


module.exports = {
  initializeGame: initializeGame,
  addPlayerToGame: addPlayerToGame,
};
