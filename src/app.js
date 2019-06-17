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

function moveLeft(activePieceObj) {
	let coords = activePieceObj.coordinates;
	console.log(coords);
	for (var i = 0; i < coords.length; i++) {
		coords[i].y = coords[i].y - 1;
	}
}

function moveRight(activePieceObj) {
	let coords = activePieceObj.coordinates;
	console.log(coords);
	for (var i = 0; i < coords.length; i++) {
		coords[i].y = coords[i].y + 1;
	}
}

function rotateRight(activePieceObj) {
	let coords = activePieceObj.coordinates;
	for (var i = 0; i < coords.length; i++) {
		let xPos = coords[i].x;
		let yPos = coords[i].y;

		if (activePieceObj.horizontal === true) {
			if (i === 0) {
				xPos = xPos - 1;
				yPos = yPos + 1;
			}

			if (i === 1) {
				xPos = xPos;
				yPos = yPos;
			}

			if (i === 2) {
				xPos = xPos + 1;
				yPos = yPos - 1;
			}

			if (i === 3) {
				xPos = xPos + 2;
				yPos = yPos - 2;
			}

			coords[i].x = xPos;
			coords[i].y = yPos;


		}

		if (activePieceObj.horizontal === false) {
			if (i === 0) {
				xPos = xPos + 1;
				yPos = yPos + 1;
			}

			if (i === 1) {

				xPos = xPos;
				yPos = yPos;
			}

			if (i === 2) {
				xPos = xPos + - 1;
				yPos = yPos + - 1;

			}

			if (i === 3) {
				xPos = xPos - 2;
				yPos = yPos - 2;
			}

			coords[i].x = xPos + 1;
			coords[i].y = yPos + 1;
		}
	}

	if (activePieceObj.horizontal === true) {

		activePieceObj.horizontal = false;
	} else {
		activePieceObj.coordinates.reverse();
		activePieceObj.horizontal = true;
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

			// continue;
			// 	moveDown(activePieceObj);

			// 	placePiece(activePieceObj);
			// placePiece --- 
			// to do... 

			// console.log(activePieceObj);
			// console.log('arrow down (soft drop')

			break;
		case 'ArrowUp':
			console.log('rotate right');
			rotateRight(activePieceObj);
		case 'KeyZ':
			console.log('rotate left');
			break;
		case 'ArrowLeft':
			moveLeft(activePieceObj);
			break;
		case 'ArrowRight':
			moveRight(activePieceObj);
			break;
		case 'Space':
			// 'hard drop' 
			moveDown(activePieceObj);
			placePiece(activePieceObj);

			// exit process 
			// to do... 

			// 1. keyBoardCmd = 'Space'
			// 2. exit process

			break;
		case 'Escape':
			timerBtn.click();
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
