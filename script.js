const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status-text");
const restartButton = document.getElementById("restart-button");
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]];
let currentBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameRunning = false;

initializeGame();

function initializeGame() {
    cells.forEach(cells => cells.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    isGameRunning = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-cell-index");
    if (currentBoard[cellIndex] !== "" || !isGameRunning) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    currentBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const conditions = winConditions[i];
        const cellA = currentBoard[conditions[0]];
        const cellB = currentBoard[conditions[1]];
        const cellC = currentBoard[conditions[2]];

        if (cellA === "" || cellB === "" || cellC === "")
            continue;

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Won`;
        isGameRunning = false;
    } else if (!currentBoard.includes("")) {
        statusText.textContent = "Draw";
        isGameRunning = false;
    } else
        changePlayer();
}

function restartGame() {
    cells.forEach(cells => cells.textContent = "");
    currentBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}' Turn`;
    isGameRunning = true;
}