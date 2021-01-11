import { setLevel, setClearedLineCount } from './gameStats';

function deleteRow(e) {
    e.parentElement.classList.toggle('fade');
    e.parentElement.remove();
}

function checkTopRowBoundary() {
    let elems = document.getElementsByClassName('cell');
    let thirdRow = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    for (let i = 0; i < thirdRow.length; i++) {
        if (elems[thirdRow[i]].dataset.occupied) {
            return false;
        }
    }
    return true;
}

function validateRows() {
    let elems = document.getElementsByClassName('cell');
    let count = 0;
    let elemPos = [];
    for (let i = 0; i < elems.length; i++) {

        // new row, empty list of  'occupied' cells
        if (i % 10 === 0) {
            count = 0;
            elemPos = [];
        }

        // skip last row/lower boundary 
        if (!elems[i].parentNode.classList.contains('piece-staging-row')) {

            // add row cells with 'occupied' class to list 
            if (elems[i].dataset.occupied) {
                elemPos.push(i);
                count++;
            }

            // if row of cells is filled, insert new row 
            if (count === 10) {

                // set game dashboard stats 
                let clearedCount = setClearedLineCount(1); // +1
                if (clearedCount % 5 === 0) {
                    setLevel(1); // +1 level 
                }

                deleteRow(elems[elemPos[0]]);

                let tableBody = document.getElementById('table').tBodies[0];
                let tr = document.createElement('TR');
                tableBody.appendChild(tr);
                for (let j = 0; j < 10; j++) {
                    let td = document.createElement('TD');
                    td.classList.add('cell');
                    tr.appendChild(td);
                }

                // insert new row at 3rd position, below 'staging' area
                tableBody.insertBefore(tr, tableBody.childNodes[2]);
            }
        }
    }
}

export { validateRows, checkTopRowBoundary };