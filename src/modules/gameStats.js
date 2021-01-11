let timeInterval;
let globalLevel = 0; 

function setGameSpeedInterval() {
    timeInterval = (6 - Number(globalLevel)) * 75;
}

function setLevel(num) {
    let level = document.getElementById('levelValue');
    let value = Number(level.textContent.replace(/^\D+/g, ''));

    value = (num > 0) ? (num + value) : 1; 
    globalLevel = value;
    level.textContent = `Level: ${globalLevel}`;
    setGameSpeedInterval();
}

function setClearedLineCount(num) {
    let lines = document.getElementById('lineValue');
    let value = Number(lines.textContent.replace(/^\D+/g, ''));

    value = (num > 0) ? (num + value) : 0;  
    lines.textContent = `Lines cleared: ${value}`;
    return value;
}

export { setLevel, setClearedLineCount, timeInterval }; 