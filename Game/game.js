const game = require("./app");
const rand = require("../utils/random");
const Game = require("../model/Game");
const log = require("../utils/log");

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
 * @param   {String}  currentPlayerId  [currentPlayerId description]
 * @return  {Object}  Saved Game Info
 */
async function initializeGame(currentPlayerId) {
  const board = game.IntializeGame(8, "X");
  const gameId = "G-" + rand.generateRoomId();
  const newGame = new Game({
    gameId: gameId,
    board: board,
    gameSides: assignLetter(currentPlayerId),
  });
  // Save Game into Database
  try{
    const savedGame = await newGame.save();
    return savedGame;
  }catch(e){
    log(e.message, "error");
  }
  return savedGame;
}

module.exports = { initializeGame: initializeGame };
