const rev = require("./reversi");

function initializeGame(width) {
  const CenterPositionIndex = width / 2 - 1;
  const board = rev.generateBoard(width, width, " ");

  // Place four pieces in the center
  board[rev.rowColToIndex(board, CenterPositionIndex, CenterPositionIndex)] =
    "O";
  board[
    rev.rowColToIndex(board, CenterPositionIndex + 1, CenterPositionIndex + 1)
  ] = "O";
  board[
    rev.rowColToIndex(board, CenterPositionIndex, CenterPositionIndex + 1)
  ] = "X";
  board[
    rev.rowColToIndex(board, CenterPositionIndex + 1, CenterPositionIndex)
  ] = "X";

  return board;
}

function makeMove(board, letter, move) {
  // Copy the board
  let newBoard = board.slice();

  // Get total available moves from the board
  const availableMoves = rev.getValidMoves(newBoard, letter);
  console.log(availableMoves);

  // If the notation is invalid, then return
  if (!rev.isValidMoveAlgebraicNotation(newBoard, letter, move)) {
    return { message: "Invalid Notation" };
  }

  // If there is no available move, return
  if (availableMoves.length === 0) {
    return { message: "No Avaliable Move" };
  }

  // Place the letter to the new board
  newBoard = rev.placeLetters(newBoard, letter, move);
  // Get the cells that are able to flip and then flip the cells
  const flippedCells = rev.getCellsToFlip(
    newBoard,
    rev.algebraicToRowCol(move).row,
    rev.algebraicToRowCol(move).col
  );
  newBoard = rev.flipCells(newBoard, flippedCells);
  rev.boardToString(newBoard);
  return { lastMove: move, oldBoard: board, board: newBoard };
}

module.exports = { initializeGame: initializeGame, makeMove: makeMove };
