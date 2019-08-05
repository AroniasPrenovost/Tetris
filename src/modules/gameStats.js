let timeInterval;
function setGameSpeedInterval() {
    let level = document.getElementById('levelValue');
    let levelValue = level.textContent.replace(/^\D+/g, '');
    timeInterval = (6 - Number(levelValue)) * 75;
}

function setLevel() {
    let level = document.getElementById('levelValue');
    let levelValue = level.textContent.replace(/^\D+/g, '');
    if (!levelValue.length) {
        levelValue = 1;
    } else {
        levelValue++;
    }
    level.textContent = `Level: ${levelValue}`;
    setGameSpeedInterval();
}

function setClearedLineCount() {
    let lines = document.getElementById('lineValue');
    let lineValue = lines.textContent.replace(/^\D+/g, '');
    if (!lineValue.length) {
        lineValue = 0;
    } else {
        lineValue++;
    }
    lines.textContent = `Lines cleared: ${lineValue}`;
}

export { setLevel, setClearedLineCount, timeInterval }; 