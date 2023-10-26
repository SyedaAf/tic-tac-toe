
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    
];
let options = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".cell");
const winningMessage = document.querySelector("#winningMsg");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let running = false;

    startGame();

function startGame(){
cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);

winningMessage.textContent = `${currentPlayer}'s turn` ;
 running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
 updateGame(this, cellIndex);
 checkWinner();
}

function updateGame(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function swapPlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    winningMessage.textContent = `${currentPlayer}'s turn`;

}
function checkWinner() {
    let roundwon= false;
    for(let i = 0; i < winCombinations.length; i++) {
        const combination = winCombinations[i];
        const cellA = options[combination[0]];
        const cellB = options[combination[1]];
        const cellC = options[combination[2]];
        if(cellA == "" || cellB =="" || cellC =="") {
            continue;
        } 
        if(cellA == cellB && cellB == cellC) {
            roundwon = true;
            break;
        }
    } 
    if(roundwon) {
        winningMessage.textContent = `${currentPlayer} Wins`;
        running = false
    } 
    else if (!options.includes("")){
        winningMessage.textContent = `Draw`;
        running = false;
    } 
    else {
        swapPlayer();
    }
   
}

function restartGame() {
currentPlayer = "X";
options =  ["", "", "", "", "", "", "", "", ""];
winningMessage.textContent = `${currentPlayer}'s turn`;
cells.forEach(cell => cell.textContent = "");
running = true;
}
