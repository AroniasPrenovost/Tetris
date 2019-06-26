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
	if (obj.model === 'oPiece') {
		var hidden = [4, 5, 10, 11, 16, 17, 22, 23];
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
		// console.log('no cmd entered');
	}
}

// movement function 
function pieceMovement(activePieceObj, keyBoardCmdStr) {

	switch (keyBoardCmdStr) {
		case 'ArrowDown':
			break;
		case 'ArrowUp':
		case 'KeyZ':
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
		// console.log('no cmd entered');
	}
	keyBoardCmd = '';

	removePreviousPieces(activePieceObj);
	getLastSecondSlide(activePieceObj, keyBoardCmd);

	// check for downward collision w/ 'fixed' piece


	activePieceObj.moveDown();
	placePiece(activePieceObj);

	// check bottom board boundary. if true, fix piece 
	if (activePieceObj.checkBottomRowBoundary()) {
		moves++;
		keyBoardCmd = '';
	} else {
		currentActivePiece = nextActivePiece;
		nextActivePiece = createPiece(getRandomPieceStr());
		drawIncomingShape(nextActivePiece);
	}
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
