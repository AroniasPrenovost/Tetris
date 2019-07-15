function setLevel(int) {
    let level = document.getElementById('levelValue');
    let levelValue = document.getElementById('levelValue').textContent;
    if (!levelValue.length) {
        levelValue = int;
    } else {
        levelValue += int;
    }
    level.textContent = `Level: ${levelValue}`;
}

function clearedLineCount() {
    let lines = document.getElementById('lineValue');
    let lineValue = lines.textContent.replace(/^\D+/g, '');
    if (!lineValue.length) {
        lineValue = 0;
    } else {
        lineValue++;
    }
    lines.textContent = `Lines cleared: ${lineValue}`;
}

export { setLevel, clearedLineCount }; 