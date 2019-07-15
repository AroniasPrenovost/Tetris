import { shuffle } from './shuffle';
import { generateBoardObject } from './generateTable';

// Abstract factory design pattern 
// encapsulates a group of individual factories that have
// a common theme without specifying their concrete classes.

function pieceFactory() {
    this.createPiece = function (model) {
        var piece;

        switch (model) {
            case 'iPiece':
                piece = new iPiece();
                break;
            case 'jPiece':
                piece = new jPiece();
                break;
            case 'lPiece':
                piece = new lPiece();
                break;
            case 'oPiece':
                piece = new oPiece();
                break;
            case 'rightSnakePiece':
                piece = new rightSnakePiece();
                break;
            default:
                piece = new jPiece();
                break;
        }

        if (typeof piece.printModel === 'undefined') {
            piece.printModel = function () {
                console.log('This piece model is:', piece.model);
            }
        }

        piece.checkRotationCollisions = function () {
            let elems = document.getElementsByClassName('cell');
            let boardObject = generateBoardObject(elems);
            let coords = piece.coordinates;

            // rotate once, check for collision w/ existing piece
            piece.rotate();

            // if collision, revert back to original piece orientation and move down 
            for (var i = 0; i < coords.length; i++) {
                let xPos = coords[i].x;
                let yPos = coords[i].y;
                if (boardObject[xPos]) {
                    let posNumber = boardObject[xPos][yPos].position;
                    if (elems[posNumber].classList.contains('fixed')) {
                        for (var i = 0; i < 3; i++) {
                            piece.rotate();
                        }
                        let coords = piece.coordinates;
                        for (var i = 0; i < coords.length; i++) {
                            coords[i].x = coords[i].x + 1;
                        }
                    }
                }
            }
        }
        piece.checkYAxis = function () {
            let coords = piece.coordinates;
            for (var i = 0; i < coords.length; i++) {
                if (coords[i].y === 0 || coords[i].y === 9) {
                    if (piece.model === 'iPiece' && piece.horizontal === false) {
                        return false;
                    }
                    if (piece.model === 'jPiece' && piece.horizontal === false) {
                        return false;
                    }
                }
            }
            return true;
        }
        piece.moveUp = function () {
            let coords = piece.coordinates;
            for (var i = 0; i < coords.length; i++) {
                coords[i].x = coords[i].x - 1;
            }
        }
        piece.moveDown = function () {
            let coords = piece.coordinates;
            for (var i = 0; i < coords.length; i++) {
                coords[i].x = coords[i].x + 1;
            }
        }
        piece.moveLeft = function () {
            let elems = document.getElementsByClassName('cell');
            let boardObject = generateBoardObject(elems);
            let coords = piece.coordinates;

            // check grid boundary 
            for (var i = 0; i < coords.length; i++) {
                if (coords[i].y === 0) {
                    return false;
                }
            }

            // move to left to check piece collision
            for (var i = 0; i < coords.length; i++) {
                coords[i].y = coords[i].y - 1;
            }

            // if collision, move piece back and exit 
            for (var i = 0; i < coords.length; i++) {
                let xPos = coords[i].x;
                let yPos = coords[i].y;
                if (boardObject[xPos]) {
                    let posNumber = boardObject[xPos][yPos].position;
                    if (elems[posNumber].classList.contains('fixed')) {
                        for (var i = 0; i < coords.length; i++) {
                            coords[i].y = coords[i].y + 1;
                        }
                        return false;
                    }
                }
            }
        }
        piece.moveRight = function () {
            let elems = document.getElementsByClassName('cell');
            let boardObject = generateBoardObject(elems);
            let coords = piece.coordinates;

            // check grid boundary 
            for (var i = 0; i < coords.length; i++) {
                if (coords[i].y === 9) {
                    return false;
                }
            }

            // move to left to check piece collision
            for (var i = 0; i < coords.length; i++) {
                coords[i].y = coords[i].y + 1;
            }

            // if collision, move piece back and exit 
            for (var i = 0; i < coords.length; i++) {
                let xPos = coords[i].x;
                let yPos = coords[i].y;
                if (boardObject[xPos]) {
                    let posNumber = boardObject[xPos][yPos].position;
                    if (elems[posNumber].classList.contains('fixed')) {
                        for (var i = 0; i < coords.length; i++) {
                            coords[i].y = coords[i].y - 1;
                        }
                        return false;
                    }
                }
            }
        }
        piece.checkDownwardPieceCollision = function () {
            let elems = document.getElementsByClassName('cell');
            let boardObject = generateBoardObject(elems);
            let coords = piece.coordinates;
            let collisionFlag = false;

            // jump forward 
            for (var i = 0; i < coords.length; i++) {
                coords[i].x = coords[i].x + 1;
            }

            for (var i = 0; i < coords.length; i++) {
                let xPos = coords[i].x;
                let yPos = coords[i].y;
                if (boardObject[xPos]) {
                    let posNumber = boardObject[xPos][yPos].position;
                    if (elems[posNumber].classList.contains('fixed')) {
                        collisionFlag = true;
                        i = coords.length;
                    }
                }
            }

            // jump back  
            for (var i = 0; i < coords.length; i++) {
                coords[i].x = coords[i].x - 1;
            }

            if (collisionFlag) {
                return true;
            } else {
                return false;
            }
        }
        piece.checkBottomRowBoundary = function () {
            let lastRow = 21;
            let coords = piece.coordinates;
            let currentPieceClass = piece.model + 'Class';
            let elems = document.getElementsByClassName(currentPieceClass);
            for (var i = 0; i < coords.length; i++) {
                if (coords[i].x === lastRow) {
                    for (var c = 0; c < elems.length; c++) {
                        elems[c].classList.add('fixed');
                        elems[c].style.backgroundColor = piece.color;
                        elems[c].classList.remove(currentPieceClass);
                        c--;
                    }
                    return false;
                }
            }
            return true;
        }
        piece.disableSpaceFallMovemenet = function () {
            let secondLastRow = 20;
            let coords = piece.coordinates;
            let elems = document.getElementsByClassName('cell');
            let boardObject = generateBoardObject(elems);
            let collisionFlag = false;

            // check 2nd to last row 
            for (var i = 0; i < coords.length; i++) {
                if (coords[i].x === secondLastRow) {
                    collisionFlag = true;
                }
            }

            if (!collisionFlag) {

                // jump forward 
                for (var i = 0; i < coords.length; i++) {
                    coords[i].x = coords[i].x + 1;
                }

                // check piece collision 
                for (var i = 0; i < coords.length; i++) {
                    let xPos = coords[i].x;
                    let yPos = coords[i].y;
                    if (boardObject[xPos]) {
                        let posNumber = boardObject[xPos][yPos].position;
                        if (elems[posNumber].classList.contains('fixed')) {
                            collisionFlag = true;
                            i = coords.length;
                        }
                    }
                }

                // jump back
                for (var i = 0; i < coords.length; i++) {
                    coords[i].x = coords[i].x - 1;
                }
            }

            if (collisionFlag) {
                return false;
            } else {
                return true;
            }
        }
        return piece;
    }
}

// [][][][] 'i piece'
function iPiece() {
    this.model = 'iPiece';
    this.color = '#6aedef';
    this.length = 4;
    this.coordinates = [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
        { x: 1, y: 6 }
    ];
    this.previewCoords = [13, 14, 15, 16];
    this.horizontal = true;
    this.rotate = function () {
        let coords = this.coordinates;
        for (var i = 0; i < coords.length; i++) {
            let xPos = coords[i].x;
            let yPos = coords[i].y;

            if (this.horizontal === true) {
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

            if (this.horizontal === false) {
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

        if (this.horizontal === true) {
            this.horizontal = false;
        } else {
            let newCoords = this.coordinates;
            for (var i = 0; i < newCoords.length; i++) {
                newCoords[i].x = newCoords[i].x - 1;
            }
            this.coordinates.reverse();
            this.horizontal = true;
        }
    }
}

// []
// [][][] 'j piece'
function jPiece() {
    this.model = 'jPiece';
    this.color = '#000c74';
    this.coordinates = [
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ];
    this.previewCoords = [7, 13, 14, 15];
    this.horizontal = true;
    this.orientRight = true;
    this.rotate = function () {
        let coords = this.coordinates;
        for (var i = 0; i < coords.length; i++) {
            let xPos = coords[i].x;
            let yPos = coords[i].y;

            // position 1
            if (this.horizontal === true && this.orientRight === true) {
                if (i === 0) {
                    xPos = xPos + 1;
                    yPos = yPos + 1;
                }

                if (i === 1) {
                    xPos = xPos + 0;
                    yPos = yPos + 2;
                }

                if (i === 2) {
                    xPos = xPos + 1;
                    yPos = yPos;
                }

                if (i === 3) {
                    xPos = xPos + 2;
                    yPos = yPos - 1;
                }

                coords[i].x = xPos - 1;
                coords[i].y = yPos;

                if (i === 3) {
                    this.horizontal = false;
                    return false;
                }
            }

            // position 2
            if (this.horizontal === false && this.orientRight === true) {
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
                    yPos = yPos;
                }

                if (i === 3) {
                    xPos = xPos - 2;
                    yPos = yPos - 1;
                }

                coords[i].x = xPos;
                coords[i].y = yPos;

                if (i === 3) {
                    this.horizontal = true;
                    this.orientRight = false;
                    return false;
                }
            }

            // position 3
            if (this.horizontal === true && this.orientRight === false) {
                if (i === 0) {
                    xPos = xPos - 1;
                    yPos = yPos - 2;
                }

                if (i === 1) {
                    xPos = xPos;
                    yPos = yPos - 1;
                }

                if (i === 2) {
                    xPos = xPos - 1;
                    yPos = yPos;

                }

                if (i === 3) {
                    xPos = xPos - 2;
                    yPos = yPos + 1;
                }

                coords[i].x = xPos + 1;
                coords[i].y = yPos;

                if (i === 3) {
                    this.horizontal = false;
                    return false;
                }
            }

            // position 4
            if (this.horizontal === false && this.orientRight === false) {
                if (i === 0) {
                    xPos = xPos - 1;
                    yPos = yPos;
                }

                if (i === 1) {
                    xPos = xPos;
                    yPos = yPos - 1;
                }

                if (i === 2) {
                    xPos = xPos + 1;
                    yPos = yPos;

                }

                if (i === 3) {
                    xPos = xPos + 2;
                    yPos = yPos + 1;
                }

                coords[i].x = xPos - 1;
                coords[i].y = yPos;

                if (i === 3) {
                    this.horizontal = true;
                    this.orientRight = true;
                    return false;
                }
            }
        }
    }
}

//     []
// [][][] 'l piece'
function lPiece() {
    this.model = 'lPiece';

    this.rotate = function () {
        return lPieceRotate();
    };
}

// [][]
// [][] 'o piece'
function oPiece() {
    this.model = 'oPiece';
    this.color = '#6ab04c';
    this.coordinates = [
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ];
    this.previewCoords = [7, 8, 13, 14];
    this.rotate = function () {
        return true;
    }
}

//   [][]
// [][]  'right snake piece'
function rightSnakePiece() {
    this.model = 'rightSnakePiece';
    this.color = '#ffbe76';
    this.horizontal = true;
    this.coordinates = [
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: 1, y: 3 },
        { x: 1, y: 4 }
    ];
    this.previewCoords = [8, 9, 13, 14];
    this.rotate = function () {
        let coords = this.coordinates;
        for (var i = 0; i < coords.length; i++) {
            let xPos = coords[i].x;
            let yPos = coords[i].y;

            if (this.horizontal === true) {

                if (i === 0) {
                    xPos = xPos;
                    yPos = yPos;
                }

                if (i === 1) {
                    xPos = xPos + 1;
                    yPos = yPos - 1;
                }

                if (i === 2) {
                    xPos = xPos - 2;
                    yPos = yPos;
                }

                if (i === 3) {
                    xPos = xPos - 1;
                    yPos = yPos - 1;
                }

                coords[i].x = xPos;
                coords[i].y = yPos + 1;
            }

            if (this.horizontal === false) {

                if (i === 0) {
                    xPos = xPos - 1;
                    yPos = yPos;
                }

                if (i === 1) {
                    xPos = xPos - 2;
                    yPos = yPos - 1;
                }

                if (i === 2) {
                    xPos = xPos + 1;
                    yPos = yPos;
                }

                if (i === 3) {
                    xPos = xPos;
                    yPos = yPos - 1;
                }

                coords[i].x = xPos;
                coords[i].y = yPos;

                if (i === 3) {
                    // replace 2 w/ 1, 4 w/ 3 
                    let itemOne = (this.coordinates)[0];
                    (this.coordinates).shift();
                    (this.coordinates).splice(1, 0, itemOne);
                    let lastItem = (this.coordinates)[3];
                    (this.coordinates).pop();
                    (this.coordinates).splice(2, 0, lastItem);
                }
            }
        }

        if (this.horizontal === true) {
            this.horizontal = false;
        } else {
            this.horizontal = true;
        }
    }
}

// initialize pieces
function getRandomPieceStr() {
    var pieces = shuffle(['iPiece', 'jPiece', 'oPiece', 'rightSnakePiece' /* , 'lPiece', 'tPiece', 'leftSnakePiece' */]);
    return shuffle(pieces)[0];
}

function createPiece(pieceStr) {
    var factory = new pieceFactory();
    return factory.createPiece(pieceStr);
}

export { createPiece, pieceFactory, getRandomPieceStr }; 
