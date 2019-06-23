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

function drawIncomingShape(obj) {
	var previews = document.getElementsByClassName('preview');

	for (var v = 0; v < previews.length; v++) {
		previews[v].style.backgroundColor = '#ecf0f1';
		previews[v].style.visibility = 'visible';
	}
	var pc = obj.previewCoords;
	for (var c = 0; c < pc.length; c++) {
		previews[pc[c]].style.backgroundColor = obj.color;
	}
	if (obj.model !== 'iPiece') {
		var hidden = [5, 11, 17, 23];
		for (var z = 0; z < hidden.length; z++) {
			previews[hidden[z]].style.visibility = 'hidden';
		}
	}
}

drawIncomingShape(nextActivePiece);

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

var moves = 0;
if (moves === 0) {
	placePiece(currentActivePiece);
}

function getLastSecondSlide(activePieceObj, keyBoardCmdStr) {
	switch (keyBoardCmdStr) {
		case 'ArrowUp':
		case 'KeyZ':
			// rotate(activePieceObj);
			activePieceObj.rotate();
			break;
		case 'ArrowLeft':
			activePieceObj.moveLeft();
			break;
		case 'ArrowRight':
			activePieceObj.moveRight();
			break;
		default:
			console.log('no cmd entered');
	}
}

// movement function 
function pieceMovement(activePieceObj, keyBoardCmdStr) {

	switch (keyBoardCmdStr) {
		case 'ArrowDown':
			break;
		case 'ArrowUp':
		case 'KeyZ':
			// rotate(activePieceObj);
			activePieceObj.rotate();
			break;
		case 'ArrowLeft':
			activePieceObj.moveLeft();
			break;
		case 'ArrowRight':
			activePieceObj.moveRight();
			break;
		case 'Space':
			activePieceObj.moveDown();
			placePiece(activePieceObj);
			break;
		case 'Escape':
			timerBtn.click();
			break;
		default:
			console.log('no cmd entered');
	}
	keyBoardCmd = '';

	removePreviousPieces(activePieceObj);
	getLastSecondSlide(activePieceObj, keyBoardCmd);
	activePieceObj.moveDown();
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
			//incomingShape.innerHTML = JSON.stringify(nextActivePiece);
			drawIncomingShape(nextActivePiece);
			return false;
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
