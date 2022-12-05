"use strict";
import Board from "./classes/Board.js";
import GameResult from "./classes/GameResult.js";
import Computer from "./classes/Computer.js";
import RandomColorAnimation from "./classes/RandomColorAnimation.js";


let winner = -1;

/**
 * Instanzierung aller Klassen:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
const board = new Board();
const gameResult = new GameResult();
const randomColorAnimation = new RandomColorAnimation();
const computer = new Computer();


/**
 * Selektierungen der Elemente des Menu-Overlays:
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
 * Selektierung der Buttons in der Game-Area:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
const newGame = document.querySelector("#bt-new-game");
const menu = document.querySelector("#bt-menu");


/**
 * Click Events für Buttons im Menu-Overlay:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
// Dieser Button schließt das Menu-Overlay
closeMenu.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Dieser Button toggelt das Untermenü zur Auswahl der Schwierigkeitsstufen des Computergegners
computerButton.addEventListener("click", () => {
    if (difficulty.style.visibility === "hidden") {
        difficulty.style.visibility = "visible";
    } else {
        difficulty.style.visibility = "hidden";
    }
});

// Dieser Button setzt den Computer auf true, setzt die Schwierigkeit auf "easy",
// setzt die Total Wins aller Spieler auf 0 zurück und setzt das gesamte Spiel auf Anfang zurück,
// schleißt das Menu-Overlay und stoppt die Winanimation.
easy.addEventListener("click", () => {
    board.setStart(true);
    board.setComputer(true);
    board.setDifficulty("easy");
    board.resetTotalWins();
    board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});

// Dieser Button setzt den Computer auf true, setzt die Schwierigkeit auf "normal",
// setzt die Total Wins aller Spieler auf 0 zurück und setzt das gesamte Spiel auf Anfang zurück,
// schleißt das Menu-Overlay und stoppt die Winanimation.
normal.addEventListener("click", () => {
    board.setStart(true);
    board.setComputer(true);
    board.setDifficulty("normal");
    board.resetTotalWins();
    board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});

// Dieser Button setzt den Computer auf true, setzt die Schwierigkeit auf "godlike",
// setzt die Total Wins aller Spieler auf 0 zurück, setzt das gesamte Spiel auf Anfang zurück,
// schleißt das Menu-Overlay und stoppt die Winanimation.
godlike.addEventListener("click", () => {
    board.setStart(true);
    board.setComputer(true);
    board.setDifficulty("godlike");
    board.resetTotalWins();
    board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});

// Dieser Button setzt den computer auf false, setzt die Total Wins aller Spieler auf 0 zurück,
// setzt das gesamte Spiel auf Anfang zurück, schließt das Menu-Overlay und stoppt die Winanimation.
human.addEventListener("click", () => {
    board.setStart(true);
    board.setComputer(false);
    board.resetTotalWins();
    board.resetGame();
    overlay.style.display = "none";
    randomColorAnimation.stopRepeatFunction();
});


/**
 * Click Events für alle Felder (=Spaces) auf dem Spielfeld (=Board):
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
board.spaces.forEach(space => {
    space.addEventListener("click", (event) => {
        
        // Verhindern, dass auf ein Feld gesetzt werden kann: 
        if (space.innerHTML === "X" || 
            space.innerHTML === "O" ||                              // wenn das Feld bereits besetzt ist
            [1, 2].includes(gameResult.getGameResult(board._board)) // oder wenn ein Gewinner feststeht
            ) return
        // Wenn der Spieler keinen Gegner gewählt hat, wird beim Klick auf ein Feld das Menü wieder geöffnet
        else if (board.start === false) {
            overlay.removeAttribute("style");
            difficulty.style.visibility = "hidden";
        }

        // Computer als Gegner:
        // Spieler X beginnt und setzt seinen Zug. Dieser Wird in die Ergebnismatrix eingetragen.
        // Danach wird der Spieler gewechselt und der Spieler, welcher nun an der Reihe ist im Game-Display angezeigt.
        if (board.computer) {
            board.playerSetSymbol(space);
            let id = board.getElementId(event);
            board.writeToBoard(board._board, id, board.player);
            board.switchPlayer();
            board.displayPlayer();

            // Wenn noch kein Gewinner feststeht, ist der Computer nun an der Reihe und setzt sein Symbol.
            // Danach wird der Spieler gewechselt und der Spieler, welcher nun an der Reihe ist im Game-Display angezeigt.
            if (gameResult.getGameResult(board._board) === -1) {
                board.computerSetSymbol();
                board.switchPlayer();
                board.displayPlayer();
            }

        // Mensch als Gegner:
        // Spieler X beginnt und setzt seinen Zug. Dieser wird in die Ergebnismatrix eingetragen.
        // Danach wird der Spieler gewechselt und der Spieler, welcher nun an der Reihe ist im Game-Display angezeigt.
        } else {
            board.playerSetSymbol(space);
            let id = board.getElementId(event);
            board.writeToBoard(board._board, id, board.player);
            board.switchPlayer();
            board.displayPlayer();
        }

        // Wenn ein Gewinner feststeht wird dieser im Game-Display angezeigt und die Total Wins beider Spieler angezeigt. 
        winner = gameResult.getGameResult(board._board);
        if (winner !== -1) {
            board.displayGameResult(winner);
            board.displayTotalWins(winner);
        }

        // Falls das Spiel noch nicht begonnen hat, weil der Spieler noch keinen Gegner gewählt hat,
        // wird das Symbol wieder entfernt.
        if (board.start === false) {
            space.innerHTML = "";
            board.resetTotalWins();
            board.resetGame();
        }
    })
});


/**
 * Click Events für Buttons in der Game-Area:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
// Dieser Button stoppt die Win-Animation und setzt das gesamte Spiel auf Anfang zurück.
newGame.addEventListener("click", () => {
    randomColorAnimation.stopRepeatFunction();
    board.resetGame();
})

// Dieser Button öffnet das Menu-Overlay
 menu.addEventListener("click", () => {
    overlay.removeAttribute("style");
    difficulty.style.visibility = "hidden";
});

export {board, gameResult, computer, randomColorAnimation};