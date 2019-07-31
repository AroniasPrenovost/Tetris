import { generateGameGrid, endGameAnimation } from './modules/generateTable';
import { createPiece, getRandomPieceStr } from './modules/generatePieces';
import { validateRows, checkTopRowBoundary } from './modules/validateRows';
import { drawIncomingShape } from './modules/drawIncomingShape';
import { placePiece, removePreviousPieces } from './modules/placePiece';
import { setLevel, clearedLineCount } from './modules/gameStats';
// initialize grid and play grid object 
generateGameGrid();

// game menu 
var menu = document.getElementById('menu');
var gameGrid = document.getElementById('gameGrid');
var columns = document.getElementsByClassName('column');

// initialize game stats
var levelCount = 1;
setLevel(levelCount);
clearedLineCount();

// captures user input 
var keyBoardCmd = '';
function logKey(e) { keyBoardCmd = e.code; }
document.addEventListener('keydown', logKey);

var currentActivePiece = createPiece(getRandomPieceStr());
var nextActivePiece = createPiece(getRandomPieceStr());

drawIncomingShape(nextActivePiece);

var moves = 0;
if (moves === 0) {
	placePiece(currentActivePiece);
}

function getLastSecondSlide(activePieceObj, keyBoardCmdStr) {
	switch (keyBoardCmdStr) {
		case 'ArrowUp':
		case 'KeyZ':
			if (activePieceObj.checkYAxis()) {
				activePieceObj.checkRotationCollisions();
			}
			break;
		case 'ArrowLeft':
			activePieceObj.moveLeft();
			break;
		case 'ArrowRight':
			activePieceObj.moveRight();
			break;
		default:
	}
}

// movement function 
function pieceMovement(activePieceObj, keyBoardCmdStr) {

	if (!checkTopRowBoundary()) {
		if (timerBtn.value === 'Pause') {
			timerBtn.click();
		}
		clearInterval(myVar);
		endGameAnimation();
	} else {
		switch (keyBoardCmdStr) {
			case 'ArrowDown':
				break;
			case 'ArrowUp':
			case 'KeyZ':
				if (activePieceObj.checkYAxis()) {
					activePieceObj.checkRotationCollisions();
				}
				break;
			case 'ArrowLeft':
				activePieceObj.moveLeft();
				break;
			case 'ArrowRight':
				activePieceObj.moveRight();
				break;
			case 'Space':
				if (activePieceObj.disableSpaceFallMovemenet()) {
					activePieceObj.moveDown();
					placePiece(activePieceObj);
				}
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

		// check if downward movement caused collision w/ 'fixed' piece
		if (activePieceObj.checkDownwardPieceCollision()) {
			placePiece(activePieceObj);
			let currentPieceClass = activePieceObj.model + 'Class';
			let elems = document.getElementsByClassName(currentPieceClass);
			for (var c = 0; c < elems.length; c++) {
				elems[c].classList.add('fixed');
				elems[c].style.backgroundColor = activePieceObj.color;
				elems[c].classList.remove(currentPieceClass);
				c--;
			}

			validateRows();
			currentActivePiece = nextActivePiece;
			nextActivePiece = createPiece(getRandomPieceStr());
			drawIncomingShape(nextActivePiece);

		} else { // if no collision, proceed as expected 
			activePieceObj.moveDown();
			placePiece(activePieceObj);
			moves++;
			keyBoardCmd = '';
			validateRows();
		}
	}
}

// start & stop game controls 													//

var myVar = setInterval(function () {
	myTimer()
}, 500);

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
		}, 500);
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