// Constructor design pattern 
const generateGameGrid = () => {
	let tableDiv = document.getElementById('gameGrid');
	let table = document.createElement('TABLE');
	table.border = '1';
	table.id = 'table'
	let tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);

	for (let i = 0; i < 23; i++) {
		let tr = document.createElement('TR');

		if (i < 2) {
			tr.classList.add('piece-staging-row');
		}

		if (i === 22) {
			tr.classList.add('piece-staging-row');
		}

		tableBody.appendChild(tr);
		for (let j = 0; j < 10; j++) { // table row must be divisible by 10   
			let td = document.createElement('TD');
			td.classList.add('cell');
			if (i === 22) {
				td.dataset.occupied = true;
			}
			tr.appendChild(td);
		}
	}
	tableDiv.appendChild(table);
}

function generateBoardObject(args) {
	let board = [];
	let row = [];
	for (let i = 0; i < args.length; i++) {
		let cellObj = {};
		cellObj.class = args[i].classList[0];
		cellObj.position = Number(i);
		row.push(cellObj);
		if (row.length === 10) {
			board.push(row);
			row = [];
		}
	}
	return board;
}

function endGameAnimation() {
	let cells = document.getElementsByClassName('cell');
	for (let i = 0; i < cells.length; i++) {
		if (i > 19 && i < 220) {
			cells[i].style.backgroundColor = 'black';
		}
	}
	setTimeout(function () {
		let tableElem = document.getElementById('table');
		tableElem.parentNode.removeChild(tableElem);
		generateGameGrid();
	}, 300);
}

export { generateGameGrid, generateBoardObject, endGameAnimation };