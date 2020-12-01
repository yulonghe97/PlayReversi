const game = require("../../Game/game");
const rand = require("../../utils/random");
const gameModel = require("../../model/Game");
const roomModel = require("../../model/Room");
const log = require("../../utils/log");
const { func } = require("joi");

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
  const board = game.initializeGame(8);
  const gameId = "G-" + rand.generateRoomId();
  // Save Game into Database
  try {
    const newGame = new gameModel({
      gameId: gameId,
      board: board,
      ...assignHostLetter(currentPlayerId),
    });
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
    const newGame = await gameModel.findByIdAndUpdate(gameId, update, {
      new: true,
    });
    return { message: "Player Added to Game", data: newGame };
  } catch (e) {
    return { message: "Failed to add player", error: e.message };
  }
}

function isPlayerInGame(game, currentPlayerId) {
  return Boolean(game.currentPlayers.includes(currentPlayerId));
}

function takeTurn(currentTurn) {
  return currentTurn === "X" ? "O" : "X";
}

/**
 * Make move, calculate and save the board to database
 * @param {String} board
 * @param {String} letter
 * @param {String} move
 * @param {String} gameId
 *
 * @return Saved Game Object
 */
async function makeMove(board, letter, move, gameId) {
  try {
    const newBoard = game.makeMove(board, letter, move);
    if (newBoard.board) {
      const savedGame = await gameModel
        .findByIdAndUpdate(
          gameId,
          { $set: { board: newBoard.board, turn: takeTurn(letter) } },
          { new: true }
        )
        .lean()
        .exec();
      return savedGame;
    } else {
      throw new Error(newBoard.message);
    }
  } catch (e) {
    return { message: e.message };
  }
}

function checkAvailableMoves(board, letter) {
  return game.checkAvailableMoves(board, letter);
}

module.exports = {
  initializeGame: initializeGame,
  addPlayerToGame: addPlayerToGame,
  makeMove: makeMove,
  checkAvailableMoves: checkAvailableMoves,
};
