import { shuffle } from './shuffle';

// Abstract factory design pattern 
// Encapsulates a group of individual factories that
// have a common theme without specifying their concrete classes.

function pieceFactory() {
    this.createPiece = function (model) {
        var car;

        switch (model) {
            case 'iPiece':
                car = new iPiece();
                break;
            case 'jPiece':
                car = new jPiece();
                break;
            case 'lPiece':
                car = new lPiece();
                break;
            case 'oPiece':
                car = new oPiece();
                break;
            case 'rightSnakePiece':
                car = new rightSnakePiece();
                break;
            default:
                car = new iPiece();
                break;
        }

        if (typeof car.printModel === 'undefined') {
            car.printModel = function () {
                console.log('This car model is:', car.model);
            }
            car.rotateClockwise = function () {
                // var piece = car.model; 
                // console.log('This car model is:', car.model);
            }
        }

        return car;
    }
}

// x + y coordinates is the initial starting spot 

// counter-clockwise - keep 'bottom-left' coordinate fixed

// clockwise - keep 'bottom-right' coordinate fixed 
function rotateClockwise(coords) {
    for (var i = 0; i < coordinates.length; i++) {
        console.log('Something happenss');
    }
}




// [][][][] 'i piece'
// vertical: 2nd from top is fixed
// horizontal: 
function iPiece() {
    this.model = 'iPiece';
    this.color = '#6aedef';
    this.length = 4;
    this.coordinates = [ // second row, middle of game board 
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
        { x: 1, y: 6 }
    ];
    this.horizontal = true;
    this.rotateIndex = 1;
    this.previousRotation = '';

    this.remove = function (arg1) {
        // // removes it's class from coords
        // var coords = this.coordinates;
        // var cells = document.getElementsByClassName('cell'); 
        // for (var i = 0; i < coords.length; i++) {
        //      var xPos = coords[i].x;
        //     var yPos = coords[i].y;

        // cells[arg1[xPos][yPos].position].classList.remove('iPieceClass')
    }

    this.rotateCoordinates = function (arg) {
        this.previousRotation = arg;
        if (arg === 'clockwise') {



            for (var i = 0; i < this.coordinates.length; i++) {

                var xPos = this.coordinates[i].x;
                var yPos = this.coordinates[i].y;

                if (this.horizontal && i !== this.horizontalIndex) {
                    this.coordinates[i].x = xPos - (1 * (i - this.horizontalIndex));
                    this.coordinates[i].y = yPos + (1 * (i - this.horizontalIndex));
                }

                if (!this.horizontal && i !== this.verticalIndex) {
                    this.coordinates[i].x = xPos - (1 * (i - this.verticalIndex));
                    this.coordinates[i].y = yPos + (1 * (i - this.verticalIndex));
                }



                // console.log(xPos + ' - ' + yPos)

                // if (i === 0) {
                //     xPos = xPos-1;
                //     yPos = yPos+1;
                // } else if (i === 1) {
                //     xPos = xPos;
                //     yPos = yPos;
                // } else if(i === 2) {
                //     xPos = xPos+1;
                //     yPos = yPos-1;
                // } else {
                //     xPos = xPos+2;
                //     yPos = yPos+2;
                // }

                // coords[i].x = xPos;
                // coords[i].y = yPos + 1;


            }

            // console.log(coords)
            // this.coordinates = rotateClockwise(this.coordinates); 
        } else {
            console.log('rotate counter-clockwise');
            // this.coordinates = rotateCounterClockwise(this.coordinates); 
        }
        return this.coordinates;
    };
}

// []
// [][][] 'j piece'
function jPiece() {
    this.model = 'jPiece';
    this.color = '#000c74';

    this.createHood = function () {
        return jPieceHood();
    };
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

    this.createHood = function () {
        return oPieceHood();
    };
}

//   [][]
// [][]  'right snake piece'
function rightSnakePiece() {
    this.model = 'rightSnakePiece';

    this.createHood = function () {
        return rightSnakePieceHood();
    };
}

// if counter clockwise 




function iPieceHood() {
    build = function () {
        console.log(`Build a hood for iPiece`);
    }

    return {
        build: build
    }
}

function jPieceHood() {
    build = function () {
        console.log(`Build a hood for jPiece`);
    }

    return {
        build: build
    }
}

function lPieceRotate() {
    rotate = function () {
        console.log(`Build a hood for lPiece`);
    }

    return {
        build: build
    }
}

function oPieceHood() {
    build = function () {
        console.log(`Build a hood for oPiece`);
    }

    return {
        build: build
    }
}

function rightSnakePieceHood() {
    build = function () {
        console.log(`Build a hood for rightSnakePiece`);
    }

    return {
        build: build
    }
}

// initialize pieces
function getRandomPieceStr() {
    var pieces = shuffle(['iPiece', 'jPiece', 'lPiece', 'oPiece', 'rightSnakePiece', 'tPiece', 'leftSnakePiece']);
    return shuffle(pieces)[0];
}

function createPiece(pieceStr) {
    var factory = new pieceFactory();
    // return factory.createPiece(pieceStr);
    return factory.createPiece('iPiece');
}
export { createPiece, pieceFactory, getRandomPieceStr }; 
