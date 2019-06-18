import { generateGameGrid, generateBoardObject } from './modules/generateTable';
import { createPiece, getRandomPieceStr } from './modules/generatePieces';

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
var tableCells = document.getElementsByClassName('cell').length;
var height = document.getElementById('table').rows.length;
var rowLength = Math.ceil((tableCells / height)); // should be divisible by 10 
var lastRow = 21;

// captures user input 
var keyBoardCmd = '';
function logKey(e) { keyBoardCmd = e.code; }
document.addEventListener('keydown', logKey);

var currentActivePiece = createPiece(getRandomPieceStr());
var nextActivePiece = createPiece(getRandomPieceStr());

var incomingShape = document.getElementsByClassName('incoming-shape')[0];
incomingShape.innerHTML = JSON.stringify(nextActivePiece);

function placePiece(activePieceObj) {
	var cells = document.getElementsByClassName('cell');
	var pieceClass = activePieceObj.model + 'Class';
	var boardObject = generateBoardObject(cells);
	var coords = activePieceObj.coordinates;

	for (var i = 0; i < coords.length; i++) {
		let xPos = coords[i].x;
		let yPos = coords[i].y;
		let posNumber = boardObject[xPos][yPos].position;
		cells[posNumber].classList.add(pieceClass);
	}
}

function removePreviousPieces(activePieceObj) {
	var cells = document.getElementsByClassName('cell');
	for (var i = 0; i < cells.length; i++) {
		cells[i].classList.remove(activePieceObj.model + 'Class');
	}
}

function moveDown(activePieceObj) {
	let coords = activePieceObj.coordinates;
	for (var i = 0; i < coords.length; i++) {
		coords[i].x = coords[i].x + 1;
	}
}

function moveLeft(activePieceObj) {
	let coords = activePieceObj.coordinates;
	for (var i = 0; i < coords.length; i++) {
		coords[i].y = coords[i].y - 1;
	}
}

function moveRight(activePieceObj) {
	let coords = activePieceObj.coordinates;
	for (var i = 0; i < coords.length; i++) {
		coords[i].y = coords[i].y + 1;
	}
}

function rotate(activePieceObj) {
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
				xPos = xPos - 1;
				yPos = yPos - 1;

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
		let newCoords = activePieceObj.coordinates;
		for (var i = 0; i < newCoords.length; i++) {
			newCoords[i].x = newCoords[i].x - 1;
		}
		activePieceObj.coordinates.reverse();
		activePieceObj.horizontal = true;
	}
}

var moves = 0;
if (moves === 0) {
	placePiece(currentActivePiece);
}

function getLastSecondSlide(activePieceObj, keyBoardCmdStr) {
	switch (keyBoardCmdStr) {
		case 'ArrowUp':
		case 'KeyZ':
			rotate(activePieceObj);
			break;
		case 'ArrowLeft':
			moveLeft(activePieceObj);
			break;
		case 'ArrowRight':
			moveRight(activePieceObj);
			break;
		default:
			console.log('no cmd entered');
	}
}

// movement function 
function pieceMovement(activePieceObj, keyBoardCmdStr) {



	switch (keyBoardCmdStr) {
		case 'ArrowDown':
			// clear interval 
			// to do... 
			break;
		case 'ArrowUp':
		case 'KeyZ':
			rotate(activePieceObj);
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
			console.log('no cmd entered');
	}
	keyBoardCmd = '';

	// moveDown(activePieceObj);
	removePreviousPieces(activePieceObj);
	getLastSecondSlide(activePieceObj, keyBoardCmd);
	moveDown(activePieceObj);
	placePiece(activePieceObj);


	// check bottom border 
	for (var o = 0; o < activePieceObj.coordinates.length; o++) {
		if (activePieceObj.coordinates[o].x === lastRow) {
			let currentPieceClass = activePieceObj.model + 'Class';
			let elems = document.getElementsByClassName(currentPieceClass);
			for (var c = 0; c < elems.length; c++) {
				elems[c].classList.add('fixed');
				elems[c].style.backgroundColor = activePieceObj.color;
			}
			currentActivePiece = nextActivePiece;
			nextActivePiece = createPiece(getRandomPieceStr());
			incomingShape.innerHTML = JSON.stringify(nextActivePiece);
		}
	}

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
