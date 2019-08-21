import { generateGameGrid, endGameAnimation } from './modules/generateTable';
import { createPiece, getRandomPieceStr } from './modules/generatePieces';
import { validateRows, checkTopRowBoundary } from './modules/validateRows';
import { drawIncomingShape } from './modules/drawIncomingShape';
import { getKeyBoardCmd, getKeyBoardCmdLastSecondSlide, placePiece, removePreviousPieces } from './modules/piecePlacement';
import { setLevel, setClearedLineCount, timeInterval } from './modules/gameStats';

// initialize grid and play grid object 
generateGameGrid();

// game menu 
let menu = document.getElementById('menu');
let gameGrid = document.getElementById('gameGrid');
let columns = document.getElementsByClassName('column');

// initialize game stats
setLevel();
setClearedLineCount();

// captures user input 
let keyBoardCmd = '';
function logKey(e) { keyBoardCmd = e.code; }
document.addEventListener('keydown', logKey);

// initialize game pueces 
let currentActivePiece = createPiece(getRandomPieceStr());
let nextActivePiece = createPiece(getRandomPieceStr());
drawIncomingShape(nextActivePiece);

let moves = 0;
if (moves === 0) {
	placePiece(currentActivePiece);
}

// movement function 
function pieceMovement(activePieceObj) {

	if (!checkTopRowBoundary()) {
		if (timerBtn.value === 'Pause') {
			timerBtn.click();
		}
		clearInterval(myVar);
		endGameAnimation();
		setLevel(0);
		setClearedLineCount(0);
	} else {

		// intake initial key command and move piece 
		getKeyBoardCmd(activePieceObj, keyBoardCmd);
		keyBoardCmd = '';

		// hide previous piece, move piece, and take last second command for 'slide' 
		removePreviousPieces(activePieceObj);
		getKeyBoardCmdLastSecondSlide(activePieceObj, keyBoardCmd);

		// check if downward movement caused collision w/ 'fixed' piece
		if (activePieceObj.checkDownwardPieceCollision()) {
			placePiece(activePieceObj);
			let currentPieceClass = activePieceObj.model + 'Class';
			let elems = document.getElementsByClassName(currentPieceClass);
			for (let c = 0; c < elems.length; c++) {
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
/*
- 5 levels, levels increase every 10 rows cleared 
- At new level, intervalLength reduces 100 milliseconds */

let timeStamp;
let isPaused = false;
let btn;

let myVar = setInterval(function () {
	myTimer();
}, timeInterval);

function myTimer() {
	timeStamp = + new Date;
	pieceMovement(currentActivePiece, keyBoardCmd);
}

function toggleTimer() {
	if (isPaused) {
		myVar = setInterval(function () {
			myTimer();
		}, timeInterval);
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
let timerBtn = document.getElementById('toggleGameTimer');
timerBtn.addEventListener('click', function () {
	toggleTimer();
}); timerBtn.click(); // initial pause 

let startBtn = document.getElementById('start');
startBtn.addEventListener('click', function () {
	timerBtn.click();
	menu.style.display = 'none';
	gameGrid.style.display = 'block';
	columns[0].style.display = 'block';
	columns[1].style.display = 'block';
});

let quitBtn = document.getElementById('quit');
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