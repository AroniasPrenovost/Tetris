import { generateGameGrid, generateBoardObject } from './modules/generateTable';
import { createPiece, getRandomPieceStr } from './modules/generatePieces';

// 1. draw board 
// 2. start/stop interval set up
// 3. start interval 
// 4. draw piece 
// 5. allow movement
// 6. stop movement
// collision detection 

// initialize grid and play grid object 
generateGameGrid();

// stats
var lines = 0;
var scoreBoard = document.getElementById('lines');
scoreBoard.textContent = `Lines: ${lines}`;

var menu = document.getElementById('menu');
var gameGrid = document.getElementById('gameGrid');
var columns = document.getElementsByClassName('column');

// board specs
// var tableCells = cells.length;
// var height = document.getElementById('table').rows.length;
// var rowLength = Math.ceil((tableCells / height)); // should be divisible by 10 

// captures user input 
var keyBoardCmd = '';
function logKey(e) { keyBoardCmd = e.code; }
document.addEventListener('keydown', logKey);

var currentActivePiece = createPiece(getRandomPieceStr());

function placePiece(activePieceObj) {
	var cells = document.getElementsByClassName('cell');
	var boardObject = generateBoardObject(cells);
	var coords = activePieceObj.coordinates;

	for (var i = 0; i < coords.length; i++) {
		let xPos = coords[i].x;
		let yPos = coords[i].y;

		let posNumber = boardObject[xPos][yPos].position;
		cells[posNumber].classList.add(activePieceObj.model + 'Class');
	}
}

function moveDown(activePieceObj) {
	let coords = activePieceObj.coordinates;
	console.log(coords);
	for (var i = 0; i < coords.length; i++) {
		coords[i].x = coords[i].x + 1;
	}
}

var moves = 0;
if (moves === 0) {
	placePiece(currentActivePiece);
}

// movement function 
function pieceMovement(activePieceObj, keyBoardCmdStr) {

	switch (keyBoardCmdStr) {
		case 'ArrowDown':


			moveDown(activePieceObj);
			// moveDown(activePieceObj);

			// placePiece --- 
			// to do... 

			// console.log(activePieceObj);
			// console.log('arrow down (soft drop')

			break;
		case 'ArrowUp':
			console.log('rotate right');
		case 'KeyZ':
			console.log('rotate left');
			break;
		case 'ArrowLeft':
			console.log('arrow left (moves once per keydowni');
			break;
		case 'ArrowRight':
			console.log('arrow right (moves once per keydown');
			break;
		case 'Space':
			console.log('space (hard drop)');
			break;
		case 'Escape':
			timerBtn.click();
			break;
		case 'ArrowDown':

			break;
		default:
			console.log('inactive button');
	}

	// moveDown(activePieceObj);
	moveDown(activePieceObj);
	placePiece(activePieceObj);
	moves++;
	keyBoardCmd = '';
}

var myVar = setInterval(function () {
	myTimer()
}, 1000);

var timeStamp;
var isPaused = false;
var btn;

function myTimer() {
	timeStamp = + new Date;
	pieceMovement(currentActivePiece, keyBoardCmd);
	// console.log(timeStamp)
	// console.log(timeStamp);
}

function toggleTimer() {
	if (isPaused) {
		myVar = setInterval(function () {
			myTimer()
		}, 1000);
		btn = document.getElementById('toggleGameTimer');
		isPaused = false;
		btn.value = 'Pause';
	} else {
		clearInterval(myVar);
		btn = document.getElementById('toggleGameTimer');
		isPaused = true;
		btn.value = 'Start';
	}
}

// UI buttons, rendered last 
var timerBtn = document.getElementById('toggleGameTimer');
timerBtn.addEventListener('click', function () {
	toggleTimer();
}); timerBtn.click(); // initial pause 

var startBtn = document.getElementById('start');
startBtn.addEventListener('click', function () {
	timerBtn.click();
	menu.style.display = 'none';
	gameGrid.style.display = 'block';
	columns[0].style.display = 'block';
	columns[1].style.display = 'block';
});

var quitBtn = document.getElementById('quit');
quitBtn.addEventListener('click', function () {
	menu.style.display = 'block';
	gameGrid.style.display = 'none';
	columns[0].style.display = 'none';
	columns[1].style.display = 'none';
	if (timerBtn.value === 'Pause') {
		timerBtn.click();
	} else {
		clearInterval(myVar);
	}
});
