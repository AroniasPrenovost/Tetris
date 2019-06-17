// Constructor design pattern 
const generateGameGrid = () => {
	let tableDiv = document.getElementById('gameGrid');
	let table = document.createElement('TABLE');
	table.border = '1';
	table.id = 'table'
	let tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);

	for (let i = 0; i < 22; i++) {
		let tr = document.createElement('TR');

		if (i < 2) {
			tr.classList.add('piece-staging-row');
		}

		tableBody.appendChild(tr);
		for (let j = 0; j < 10; j++) { // table row must be divisible by 10   
			let td = document.createElement('TD');
			td.width = '10%';

			if (i < 2) {
				td.classList.add('cell');
				td.value = 'closed';
				// td.value = 'open';
			} else {
				td.classList.add('cell');
				td.value = 'open';
			}

			tr.appendChild(td);
		}
	}
	tableDiv.appendChild(table);
}

function generateBoardObject(args) {
	var board = [];
	var row = [];
	for (var i = 0; i < args.length; i++) {
		var cellObj = {};
		cellObj.class = args[i].classList[0];
		cellObj.position = Number(i);
		row.push(cellObj);
		if (row.length === 10) {
			board.push(row);
			row = [];
		}
	}
	return board; s
}


// function paintPiece(obj) {
// 	for (var i = 0; i < obj.length; i++) {

// 	}
// }

export { generateGameGrid, generateBoardObject, targetXandYAxis };
