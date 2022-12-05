"use strict";
// Import of needed modules
import {Board}                from "./classes/Board.js";
import Computer             from "./classes/Computer.js";
import GameResult           from "./classes/GameResult.js";
import RandomColorAnimation from "./classes/RandomColorAnimation.js";


let winner = -1;

/**
 * Instantiation of all classes:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
// const board = new Board();
const gameResult = new GameResult();
const randomColorAnimation = new RandomColorAnimation();
const computer = new Computer();


/**
 * Selections of menu-overlay elements:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
const overlay = document.querySelector(".overlay");
const computerButton = document.querySelector("#computer");
const human = document.querySelector("#human");
const difficulty = document.querySelector(".difficulty");
const easy = document.querySelector("#easy");
const normal = document.querySelector("#normal");
const godlike = document.querySelector("#godlike");
const closeMenu = document.querySelector("#bt-cancel");


/**
 * Selections of menu-overlay elements:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
const newGame = document.querySelector("#bt-new-game");
const menu = document.querySelector("#bt-menu");


/**
 * Click events of buttons in menu-overlay:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
// Button closes the menu-overlay
closeMenu.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Button toggles submenu for choosing the computer's difficulty 
computerButton.addEventListener("click", () => {
    if (difficulty.style.visibility === "hidden") {
        difficulty.style.visibility = "visible";
    } else {
        difficulty.style.visibility = "hidden";
    }
});

// Button activates computer as opponent with difficulty of "easy",
// resets total wins of all players back to 0 and resets the game, closes menu-overlay and stops win animation.
easy.addEventListener("click", () => {
    Board.setStart(true);
    Board.setComputer(true);
    Board.setDifficulty("easy");
    Board.resetTotalWins();
    Board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});

// Button activates computer as opponent with difficulty of "normal",
// resets total wins of all players back to 0 and resets the game, closes menu-overlay and stops win animation.
normal.addEventListener("click", () => {
    Board.setStart(true);
    Board.setComputer(true);
    Board.setDifficulty("normal");
    Board.resetTotalWins();
    Board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});

// Button activates computer as opponent with difficulty of "godlike",
// resets total wins of all players back to 0 and resets the game, closes menu-overlay and stops win animation.
godlike.addEventListener("click", () => {
    Board.setStart(true);
    Board.setComputer(true);
    Board.setDifficulty("godlike");
    Board.resetTotalWins();
    Board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});

// Button deactivates computer opponent (=activating human opponent), 
// resets total wins of all players back to 0 and resets the game, closes menu-overlay and stops win animation.
human.addEventListener("click", () => {
    Board.setStart(true);
    Board.setComputer(false);
    Board.resetTotalWins();
    Board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});


/**
 * Click events for all spaces on the board:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
Board.spaces.forEach(space => {
    space.addEventListener("click", (event) => {
        
        // prevent moving on a space 
        if (space.innerHTML === "X" || 
            space.innerHTML === "O" ||                              // if space is not empty
            [1, 2].includes(gameResult.getGameResult(Board._board)) // or if there is a winner
            ) return
        // opening the menu-overlay instead of setting the player´s symbol if player didn´t choose an opponent
        else if (Board.start === false) {
            overlay.removeAttribute("style");
            difficulty.style.visibility = "hidden";
        }

        // Opponent: COMPUTER
        //===================
        // Player X starts the game. Move is being written into the _board array (= representation of the board as a multidimensional array)
        // Switch player and show active player in game display 
        if (Board.computer) {
            Board.playerSetSymbol(space);
            let id = Board.getElementId(event);
            Board.writeToBoard(Board._board, id, Board.player);
            Board.switchPlayer();
            Board.displayPlayer();
            
            // If there is no winner yet it is the computer's turn who will make his move.
            // Switch player and show active player in game display 
            if (gameResult.getGameResult(Board._board) === -1) {
                Board.computerSetSymbol();
                Board.switchPlayer();
                Board.displayPlayer();
            }


        // Opponent: HUMAN
        //================
        // Player X starts the game. Move is being written into the _board array (= representation of the board as a multidimensional array)
        // Switch player and show active player in game display 
        } else {
            Board.playerSetSymbol(space);
            let id = Board.getElementId(event);
            Board.writeToBoard(Board._board, id, Board.player);
            Board.switchPlayer();
            Board.displayPlayer();
        }
 
        // If there is a winner show the winner in the game display and update total win count
        winner = gameResult.getGameResult(Board._board);
        if (winner !== -1) {
            Board.displayGameResult(winner);
            Board.displayTotalWins(winner);
        }

        // If the game hasn't startet yet because the player didn't choose an opponent yet, remove the symbol from the space
        if (Board.start === false) {
            space.innerHTML = "";
            Board.resetTotalWins();
            Board.resetGame();
        }
    })
});


/**
 * Click events for bottons in game area:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
// Button stops win animation and resets the game
newGame.addEventListener("click", () => {
    randomColorAnimation.stopRepeatFunction();
    Board.resetGame();
})

// Button opens menu overlay
 menu.addEventListener("click", () => {
    overlay.removeAttribute("style");
    difficulty.style.visibility = "hidden";
});