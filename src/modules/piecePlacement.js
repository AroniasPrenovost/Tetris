import { generateBoardObject } from './generateTable';

// takes currentActivePiece as argument 
function placePiece(activePieceObj) {
    let cells = document.getElementsByClassName('cell');
    let pieceClass = activePieceObj.model + 'Class';
    let boardObject = generateBoardObject(cells);
    let coords = activePieceObj.coordinates;

    for (let i = 0; i < coords.length; i++) {
        let xPos = coords[i].x;
        let yPos = coords[i].y;
        let posNumber = boardObject[xPos][yPos].position;
        cells[posNumber].classList.add(pieceClass);
    }
}

function getKeyBoardCmd(activePieceObj, keyBoardCmdStr) {
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
    }
}

function getKeyBoardCmdLastSecondSlide(activePieceObj, keyBoardCmdStr) {
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

// takes currentActivePiece as argument 
function removePreviousPieces(activePieceObj) {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove(activePieceObj.model + 'Class');
    }
}

export { getKeyBoardCmd, getKeyBoardCmdLastSecondSlide, placePiece, removePreviousPieces }; 
