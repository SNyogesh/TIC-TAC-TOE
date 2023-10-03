const cells = document.querySelectorAll(".cell");
const display = document.querySelectorAll("span");
const restartBtn = document.querySelector(".btn");
const PlayerStatus = document.querySelector("#playerTurns");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = 'x';
let running = false;

initialize();

function initialize(){
    cells.forEach(cell=>cell.addEventListener('click',cellClicked));
    restartBtn.addEventListener('click',restartGame);
    PlayerStatus.textContent = ` ${currentPlayer}'s turn ` ;
    running = true;
};

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return
    }
    updateCell(cellIndex);
    checkWinner();  
};

function updateCell(index){
    options[index] = currentPlayer;
    display[index].innerText = currentPlayer;  
};

function changePlayer(){
    currentPlayer = (currentPlayer == "x") ? "o" : "x";
    PlayerStatus.textContent = `${currentPlayer}'s turn`;
};

function checkWinner(){
    let roundWon = false;
    for(i=0;i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA =  options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon= true;
            break;
        }

    }

    if(roundWon){
        PlayerStatus.innerText = `${currentPlayer}'s won!`;
        running = false;
    }
    else if(!options.includes("")){
        PlayerStatus.innerText = "Draw!";
        running = false;
    }
    else{
        changePlayer();
    }
};

function restartGame(){
    currentPlayer="x";
    options = ["","","","","","","","",""];
    PlayerStatus.textContent = `${currentPlayer}'s turn`;
    for(i=0;i<9;i++){
        display[i].innerText = "";
    }
    running=true;
};