const statusDisplay = document.querySelector('.game-status');
const cells = document.querySelectorAll('.cells');
const restart = document.querySelector('#restart');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['','','','','','','','',''];

const winRounds = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayer(){
    currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    statusDisplay.innerHTML = `Ход игрока ${currentPlayer}`
}

function handleResultValidation(){
    let roundWon = false;

    for(let i = 0; i <= 7; i++){
        const winRound = winRounds[i];
        const a = gameState[winRound[0]];
        const b = gameState[winRound[1]];
        const c = gameState[winRound[2]];

        if(a === '' && b === '' && c === ''){
            continue
        }

        if(a === b && b === c){
            roundWon = true;
            break
        }
    }

        if(roundWon){
            gameActive = false;
            statusDisplay.innerHTML = `${currentPlayer} победил!`;
            return
        }

        const roundDraw = !gameState.includes('');
        
        if(roundDraw){
            gameActive = false;
            statusDisplay.innerHTML = 'Ничья!'
            return
        }

        handlePlayer()
    
}

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex  = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== '' || !gameActive){
        return
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation()
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = `Ход игрока ${currentPlayer}`;
    cells.forEach(cell => cell.innerHTML = '')
}

function initGame(){
    statusDisplay.innerHTML = `Ход игрока: ${currentPlayer}`;
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restart.addEventListener('click', handleRestartGame);
};

initGame()