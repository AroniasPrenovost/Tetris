import { generateBoardObject } from './generateTable';

// takes currentActivePiece as argument 
function placePiece(activePieceObj) {
    let cells = document.getElementsByClassName('cell');
    let pieceClass = activePieceObj.model + 'Class';
    let boardObject = generateBoardObject(cells);
    let coords = activePieceObj.coordinates;

    for (var i = 0; i < coords.length; i++) {
        let xPos = coords[i].x;
        let yPos = coords[i].y;
        let posNumber = boardObject[xPos][yPos].position;
        cells[posNumber].classList.add(pieceClass);
    }
}

// takes currentActivePiece as argument 
function removePreviousPieces(activePieceObj) {
    let cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove(activePieceObj.model + 'Class');
    }
}

export { placePiece, removePreviousPieces }; 
