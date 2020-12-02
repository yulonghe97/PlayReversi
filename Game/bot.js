

const rev = require("./reversi");
const readlineSync = require("readline-sync");
const fs = require("fs");

// Pass in the Argument for reading JSON Configuration
process.argv.forEach((val, index) => {});

//Check if user type the config file and then read the file

// Declare presetting variables
let readData, letter, ScriptedBoard;
let playerMoves = [];
let botMoves = [];

// Variables to store Game Information

if (process.argv[2] !== undefined) {
  fs.readFile(process.argv[2], "utf8", function (err, data) {
    if (err) {
      console.log("Error in reading the config file!");
    } else {
      // Read the Data from JSON
      readData = JSON.parse(data);
      letter = readData.boardPreset.playerLetter;
      ScriptedBoard = readData.boardPreset.board;
      playerMoves = readData.scriptedMoves.player;
      botMoves = readData.scriptedMoves.computer;

      // load the board
      console.log("Scripted Board Loaded Successfully!");
      const board = ScriptedBoard;

      rev.boardToString(board);

      GamePlay(board, letter, playerMoves, botMoves);
    }
  });
} else {
  IntializeGame();
}

function assignRandomRoomId (){
  return Math.random().toString(36).substring(2, 8)
}

/*
    Initialize Game without the scripted moving
    # it will ask player the width of the board
    # it will ask player the letter
    # it will initialize the board based on player's setting

 */

function IntializeGame(width, letter) {
  // Greating to User
    //   console.log("-".repeat(40));
    //   console.log("LET'S PLAY REVERSI \uD83D\uDE00");
    //   console.log("-".repeat(40));
    //   const readlineSync = require("readline-sync");

  // Initialize Variables
  let isValid = true;

  // Read the board width
  //   while (isValid) {
  //     width = readlineSync.question(
  //       "How wide should the board be? (even numbers between 4 and 26, inclusive)\n>"
  //     );
  //     if (isNaN(width) === false) {
  //       if (width <= 26 && width >= 4 && width % 2 === 0) {
  //         isValid = false;
  //       }
  //     }
  //   }

  // Reset switch
  isValid = true;

  // Read the user color choice
  //   while (isValid) {
  //     letter = readlineSync.question(
  //       "Pick your letter: X (Black) \u26ab  or  O (White) \u26aa \n>"
  //     );
  //     if (letter === "X" || letter === "O") {
  //       isValid = false;
  //     }
  //   }

  // console.log("-".repeat(20));
  // console.log(`Player is ${letter}`);
  // console.log("-".repeat(20));

  // Initialize the Board with 4 pieces in the center

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

  // Return the Initialized Board
  return board;

  // ---- Old code ----

  //   rev.boardToString(board);

  // Game Start at this point. X goes first

  //   if (letter === "X") {
  //     GamePlay(board, "X", playerMoves, botMoves);
  //   } else {
  //     GamePlay(board, "O", playerMoves, botMoves);
  //   }
}

function GamePlay(board, letter, scriptedPlayerMoves, scriptedBotMoves) {
  let playerNextMove;
  let validMove = false;
  let newBoard = board.slice(); // Copy the initialized board
  let playerScore = 0;
  let botScore = 0;
  let botLetter;

  // Variable to determine if there are two consecutive passes
  let botPass = false;
  let playerPass = false;

  // Variable for scripted moves
  let scriptedMoveCounter = 0;

  // Determine and assign BOT's letter
  letter === "X" ? (botLetter = "O") : (botLetter = "X");

  // Determine who should start first
  if (letter === "X") {
    while (botPass === false && playerPass === false) {
      validMoves(scriptedPlayerMoves);
      updateBoard(letter, playerNextMove);
      updateScore();
      readlineSync.question("Press <ENTER> to show computer's move...");
      botMove(scriptedBotMoves);
      updateScore();
    }
  } else {
    while (botPass === false && playerPass === false) {
      botMove(scriptedBotMoves);
      updateScore();
      validMoves(scriptedPlayerMoves);
      updateBoard(letter, playerNextMove);
      updateScore();
      readlineSync.question("Press <ENTER> to show computer's move...");
    }
  }

  console.log("-".repeat(12));
  console.log(`FINAL SCORE`);
  console.log("-".repeat(12));

  // Game ends
  updateScore();
  if (playerScore === botScore) {
    console.log("DRAW!!!");
  } else {
    playerScore > botScore
      ? console.log("YOU WON!!!")
      : console.log("YOU LOSS!");
  }

  // This function Determines if it should ask player to move or not
  function validMoves(playerScriptedMove) {
    // If there is a scripted move
    if (playerScriptedMove[scriptedMoveCounter] !== undefined) {
      if (
        rev.isValidMoveAlgebraicNotation(
          newBoard,
          letter,
          playerScriptedMove[scriptedMoveCounter]
        )
      ) {
        //If the scripted move is valid
        playerNextMove = playerScriptedMove[scriptedMoveCounter];
        readlineSync.question(
          `Player Move to ${playerNextMove} is scripted\n Press <ENTER> to continue.`
        );
      } else {
        readlineSync.question(
          `Scripted Move ${playerScriptedMove[scriptedMoveCounter]} is Invalid. Press <ENTER> to  Make the move manually.`
        );
        manualMove();
      }
    } else {
      manualMove();
    }

    function manualMove() {
      // Get total available moves from the board
      const availableMoves = rev.getValidMoves(newBoard, letter);

      // If there is no available move, ask player to pass. Otherwise, ask player to move
      if (availableMoves.length === 0) {
        readlineSync.question(
          "There is NO valid moves available for you\nPress <ENTER> to pass."
        );
        playerPass = true;
      } else {
        playerPass = false;
        while (validMove === false) {
          // Ask player for the next move
          playerNextMove = readlineSync.question(
            "\nWhat is Your Move? <Please use Algebraic Notation> \n>"
          );

          if (
            rev.isValidMoveAlgebraicNotation(newBoard, letter, playerNextMove)
          ) {
            validMove = true;
            break;
          }

          console.log(
            playerNextMove +
              " INVALID MOVE. Your move should be: \n* be in a format\n* specify an existing empty cell\n* flip at least one of your opponent pieces"
          );
        }

        //reset

        validMove = false;
      }
    }
  }

  // This function update the board
  function updateBoard(updatedLetter, move) {
    // Place the letter to the new board
    newBoard = rev.placeLetters(newBoard, updatedLetter, move);
    // Get the cells that are able to flip and then flip the cells
    const flippedCells = rev.getCellsToFlip(
      newBoard,
      rev.algebraicToRowCol(move).row,
      rev.algebraicToRowCol(move).col
    );
    newBoard = rev.flipCells(newBoard, flippedCells);
    rev.boardToString(newBoard);
  }

  // This function updates and outputs the score that player has
  function updateScore() {
    if (letter === "X") {
      playerScore = rev.getLetterCounts(newBoard).X;
      botScore = rev.getLetterCounts(newBoard).O;

      // Output the score

      console.log("Score\n=====");
      console.log(`X: ${playerScore}`);
      console.log(`O: ${botScore}\n`);
    } else {
      playerScore = rev.getLetterCounts(newBoard).O;
      botScore = rev.getLetterCounts(newBoard).X;

      // Output the score

      console.log("Score\n=====");
      console.log(`X: ${botScore}`);
      console.log(`O: ${playerScore}\n`);
    }
  }

  // This function generates the computer move for the game
  function botMove(botScriptedMove) {
    const botAvailableMoves = rev.getValidMoves(newBoard, botLetter);

    if (botScriptedMove[scriptedMoveCounter] !== undefined) {
      // If there is scripted move for bot, then check if the move is valid
      if (
        rev.isValidMoveAlgebraicNotation(
          newBoard,
          botLetter,
          botScriptedMove[scriptedMoveCounter]
        )
      ) {
        console.log(
          `BOT Move ${botScriptedMove[scriptedMoveCounter]} is scripted.`
        );
        updateBoard(botLetter, botScriptedMove[scriptedMoveCounter]);
      } else {
        readlineSync.question(
          `Scripted Move ${botScriptedMove[scriptedMoveCounter]} is Invalid. Press <ENTER> to see BOT's Manual Move.`
        );
        botManualMove();
      }

      // Update the scripted move
      scriptedMoveCounter++;
    } else {
      // If there is no scripted move, then make the bot move manually.
      botManualMove();
    }

    // player board, letter, move
    // return bot move, bot old board, bot new board()
    function botOptimalMove(playerBoard, playerLetter, playerMove) {
      if (playerLetter == "X") {
          botLetter == "O";
      } else{
          botLetter == "X";
      }
      const botAvailableMoves = rev.getValidMoves(playerBoard, botLetter);
      if (botAvailableMoves.length === 0) {
        readlineSync.question(
          "BOT does not have valid move. BOT chooses to PASS! Press <Enter> to continue "
        );
        botPass = true;
      } else {
        botPass = false;
        let optimal = 0;
        let optimalMove;
        for(i = 0; i < botAvailableMoves.length; i++){
            const currentMove = botAvailableMoves[i];
            let currentBoard = playerBoard.slice();
            currentBoard[
                rev.rowColToIndex(currentBoard, currentMove[0], currentMove[1])
              ] = botLetter;
            
            const botCurrentFlippedCells = rev.getCellsToFlip(
                currentBoard,
                currentMove[0],
                currentMove[1]
              );
            
            if (botLetter === "X") {
                currentScore = rev.getLetterCounts(currentBoard).X;
            }
            else{
                currentScore = rev.getLetterCounts(currentBoard).O;
            }
            if (currentScore > optimal){
                optimal = currentScore;
                optimalMove = botAvailableMoves[i];
            }
        }
        let newBoard = playerBoard.slice();
        // Place random Moves and update the board
        newBoard[
          rev.rowColToIndex(newBoard, optimalMove[0], optimalMove[1])
        ] = botLetter;

        // Update the board and score
        const botFlippedCells = rev.getCellsToFlip(
          newBoard,
          optimalMove[0],
          optimalMove[1]
        );
        newBoard = rev.flipCells(newBoard, botFlippedCells);

        // Print out the board after bot finishes moves;
        rev.boardToString(newBoard);

        // Print out the board before bot moves;
        rev.boardToString(playerBoard)

        // Tell player what move BOT makes
        console.log("-".repeat(30));
        console.log(
          `The BOT placed letter at [${optimalMove[0] + 1},${optimalMove[1] + 1}]`
        );
        console.log("-".repeat(30));
      }
    }
  }
}

module.exports = {
  IntializeGame: IntializeGame,
};
