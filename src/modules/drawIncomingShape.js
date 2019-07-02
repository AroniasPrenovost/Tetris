// takes nextActivePiece as argument 
function drawIncomingShape(obj) {
    var previews = document.getElementsByClassName('preview');

    for (var v = 0; v < previews.length; v++) {
        previews[v].style.backgroundColor = '#ecf0f1';
        previews[v].style.visibility = 'visible';
    }
    var pc = obj.previewCoords;
    for (var c = 0; c < pc.length; c++) {
        previews[pc[c]].style.backgroundColor = obj.color;
    }
    if (obj.model !== 'iPiece') {
        var hidden = [5, 11, 17, 23];
        for (var z = 0; z < hidden.length; z++) {
            previews[hidden[z]].style.visibility = 'hidden';
        }
    }
    if (obj.model === 'oPiece') {
        var hidden = [4, 5, 10, 11, 16, 17, 22, 23];
        for (var z = 0; z < hidden.length; z++) {
            previews[hidden[z]].style.visibility = 'hidden';
        }
    }
}

export { drawIncomingShape }; 
