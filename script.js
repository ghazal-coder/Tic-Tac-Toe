const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const modal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const closeModal = document.getElementById('close-modal');
const fireworksContainer = document.getElementById('fireworks');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWin()) {
        gameActive = false;
        highlightWinner();
        showResult(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()) {
        gameActive = false;
        showResult("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerInfo();
    }
}

function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === currentPlayer);
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function highlightWinner() {
    winPatterns.forEach(pattern => {
        if (pattern.every(index => gameBoard[index] === currentPlayer)) {
            pattern.forEach(index => {
                cells[index].classList.add('winner', 'animate__animated', 'animate__pulse');
            });
        }
    });
}

function updatePlayerInfo() {
    player1.classList.toggle('active');
    player2.classList.toggle('active');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner', 'animate__animated', 'animate__pulse');
    });
    player1.classList.add('active');
    player2.classList.remove('active');
    modal.style.display = 'none';
}

function showResult(message) {
    resultMessage.textContent = message;
    modal.style.display = 'block';
    if (message.includes('wins')) {
        startFireworks();
    }
}

function startFireworks() {
    const fireworks = new Fireworks(fireworksContainer, {
        rocketsPoint: 50,
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 90,
        trace: 3,
        explosion: 6,
        autoresize: true,
        brightness: { 
            min: 50, 
            max: 80,
            decay: { min: 0.015, max: 0.03 }
        },
        mouse: { click: false, move: false, max: 1 }
    });

    fireworks.start();
    setTimeout(() => fireworks.stop(), 5000);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
closeModal.addEventListener('click', resetGame);