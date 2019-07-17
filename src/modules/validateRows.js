import { clearedLineCount } from './gameStats';

function deleteRow(e) {
    e.parentElement.classList.toggle('fade');
    e.parentElement.remove();
}

function checkTopRowBoundary() {
    var elems = document.getElementsByClassName('cell');
    var thirdRow = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    for (var i = 0; i < thirdRow.length; i++) {
        if (elems[thirdRow[i]].classList.contains('fixed')) {
            return false;
        }
    }
    return true;
}

function validateRows() {
    var elems = document.getElementsByClassName('cell');
    var count = 0;
    var elemPos = [];
    for (var i = 0; i < elems.length; i++) {

        // new row, empty list of 'fixed' cells
        if (i % 10 === 0) {
            count = 0;
            elemPos = [];
        }

        // add row cells with 'fixed' class to list 
        if (elems[i].classList.contains('fixed')) {
            elemPos.push(i);
            count++;
        }

        // if row of cells is filled, insert new row 
        if (count === 10) {

            // set game dashboard stats 
            clearedLineCount();

            deleteRow(elems[elemPos[0]]);

            let tableBody = document.getElementById('table').tBodies[0];
            let tr = document.createElement('TR');
            tableBody.appendChild(tr);
            for (let j = 0; j < 10; j++) {
                let td = document.createElement('TD');
                td.width = '10%';
                td.classList.add('cell');
                tr.appendChild(td);
            }

            // insert new row at 3rd position, below 'staging' area
            tableBody.insertBefore(tr, tableBody.childNodes[2]);
        }
    }
}

export { validateRows, checkTopRowBoundary };


