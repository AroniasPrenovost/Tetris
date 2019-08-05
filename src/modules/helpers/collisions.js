// helper functions 
import { generateBoardObject } from '../generateTable';

// takes piece object as args, and left/right as string 
// if collision, returns true 
function checkHorizontalCollision(obj, str) {
    let cells = document.getElementsByClassName('cell');
    let boardObject = generateBoardObject(cells);
    let coords = obj.coordinates;

    // check grid boundary 
    for (let i = 0; i < coords.length; i++) {
        if (str === 'right') {
            if (coords[i].y === 9) {
                return false;
            }
        } else {
            if (coords[i].y === 0) {
                return false;
            }
        }
    }

    for (let i = 0; i < coords.length; i++) {
        if (str === 'right') {
            coords[i].y = coords[i].y + 1;
        } else {
            coords[i].y = coords[i].y - 1;
        }
    }

    // if collision, move piece back and exit 
    for (let i = 0; i < coords.length; i++) {
        let xPos = coords[i].x;
        let yPos = coords[i].y;
        if (boardObject[xPos]) {
            let posNumber = boardObject[xPos][yPos].position;
            if (cells[posNumber].classList.contains('fixed')) {
                for (let i = 0; i < coords.length; i++) {
                    if (str === 'right') {
                        coords[i].y = coords[i].y - 1;
                    } else {
                        coords[i].y = coords[i].y + 1;
                    }
                }
                return false;
            }
        }
    }
}

function moveVertically(obj, str) {
    let coords = obj.coordinates;
    for (let i = 0; i < coords.length; i++) {
        if (str === 'up') {
            coords[i].x = coords[i].x - 1;
        } else {
            coords[i].x = coords[i].x + 1;
        }
    }
}

export { checkHorizontalCollision, moveVertically };
