import { generateGameGrid, endGameAnimation } from './modules/generateTable';
import { createPiece, getRandomPieceStr } from './modules/generatePieces';
import { validateRows, checkTopRowBoundary } from './modules/validateRows';
import { drawIncomingShape } from './modules/drawIncomingShape';
import { getKeyBoardCmd, getKeyBoardCmdLastSecondSlide, placePiece, removePreviousPieces } from './modules/piecePlacement';
import { setLevel, setClearedLineCount, timeInterval } from './modules/gameStats';

// initialize grid and play grid object 
generateGameGrid();

// initialize game / clear stats 
setLevel(1);
setClearedLineCount(0);

// capture user input 
let keyBoardCmd = '';
function logKey(e) { keyBoardCmd = e.code; }
document.addEventListener('keydown', logKey);

// initialize game pieces /////////
let currentActivePiece = createPiece(getRandomPieceStr());
let nextActivePiece = createPiece(getRandomPieceStr());
drawIncomingShape(nextActivePiece);
///////////////////////////////////

placePiece(currentActivePiece);

// end game
function gameOver(str) {
	if ((startBtn.value).toLowerCase() === 'pause') {
		startBtn.click();
	}

	// reset pieces //////////////////
	currentActivePiece = createPiece(getRandomPieceStr());
	nextActivePiece = createPiece(getRandomPieceStr());
	drawIncomingShape(nextActivePiece);
	///////////////////////////////////

	clearInterval(myVar);
	endGameAnimation();
	setLevel(0);
	setClearedLineCount(0);
	if (str && str.length > 0) {
		alert(str);
	}
}

// movement function 
function pieceMovement(activePieceObj) {

	if (!checkTopRowBoundary()) {
		gameOver('You lose!');
	} else {

		// intake initial key command and move piece 
		getKeyBoardCmd(activePieceObj, keyBoardCmd);
		keyBoardCmd = '';

		// hide previous piece, move piece, and take last second command for 'slide' 
		removePreviousPieces(activePieceObj);
		getKeyBoardCmdLastSecondSlide(activePieceObj, keyBoardCmd);

		// check if downward movement caused collision w/ 'occupied' piece
		if (activePieceObj.checkDownwardPieceCollision()) {
			placePiece(activePieceObj);
			let currentPieceClass = activePieceObj.model + 'Class';
			let elems = document.getElementsByClassName(currentPieceClass);
			for (let c = 0; c < elems.length; c++) {
				elems[c].dataset.occupied = true;
				elems[c].style.backgroundColor = activePieceObj.color;
				elems[c].classList.remove(currentPieceClass);
				c--;
			}

			validateRows();
			// update pieces //////////////////
			currentActivePiece = nextActivePiece;
			nextActivePiece = createPiece(getRandomPieceStr());
			drawIncomingShape(nextActivePiece);
			///////////////////////////////////
		
		} else { // if no collision, proceed as expected 
			
			activePieceObj.moveDown();
			placePiece(activePieceObj);
			keyBoardCmd = '';
			validateRows();
		}
	}
}

/*
 start & stop game controls 	

 5 levels total. +1 level every 10 rows cleared 
 at new level, intervalLength decreases by 100 milliseconds
*/ 

let timeStamp;
let isPaused = false;
let startBtn = document.getElementById('toggleGameTimer');

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
		isPaused = false;
		startBtn.value = 'Pause';
	} else {
		clearInterval(myVar);
		isPaused = true;
		startBtn.value = 'Start';
	}
}

startBtn.addEventListener('click', function () {
	toggleTimer();
}); startBtn.click(); // initial pause 

let quitBtn = document.getElementById('quit');
quitBtn.addEventListener('click', function () {
	gameOver('You quit!'); 
});