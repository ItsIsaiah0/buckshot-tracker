const liveInput = document.getElementById('live-input');
const blankInput = document.getElementById('blank-input');
const livePercentText = document.getElementById('live-percent');
const blankPercentText = document.getElementById('blank-percent');
const fireLive = document.getElementById('fire-live');
const fireBlank = document.getElementById('fire-blank');
const reverse = document.getElementById('reverse');
const clearRnd = document.getElementById('clear-round');
const moveLog = document.getElementById('move-log');

function updateOdds() {

    let lives = Number(liveInput.value) || 0;
    let blanks = Number(blankInput.value) || 0;

    let total = lives + blanks;

    if (total === 0) {
        livePercentText.innerText = "0%";
        blankPercentText.innerText = "0%";
        return;
    }

    let liveChance = Math.round((lives / total) * 100);
    let blankChance = Math.round((blanks / total) * 100);

    livePercentText.innerText = liveChance + "%";
    blankPercentText.innerText = blankChance + "%";
}

liveInput.addEventListener('input', updateOdds);
blankInput.addEventListener('input', updateOdds);

function clearRound() {

    liveInput.value = '';
    blankInput.value = '';

    moveLog.innerHTML = '<p>Game log will appear here...</p>';

    updateOdds();
}

clearRnd.addEventListener('click', clearRound);

function addToLog(message) {
    if (moveLog.innerHTML.includes("Game log will appear here...")) {
        moveLog.innerHTML = '';
    }

    moveLog.innerHTML += `<p> ${message}</p>`;

    moveLog.scrollTop = moveLog.scrollHeight;
}

function shootLive() {
    let currentLives = Number(liveInput.value) || 0;
    if (currentLives > 0) {
        liveInput.value = currentLives - 1; // Subtract 1
        addToLog("<span style='color: #ff5252;'>Fired LIVE shell</span>");
        updateOdds(); // Update the math!
    }
}

function shootBlank() {
    let currentBlanks = Number(blankInput.value) || 0;
    if (currentBlanks > 0) {
        blankInput.value = currentBlanks - 1; // Subtract 1
        addToLog("<span style='color: #1976d2;'>Fired BLANK shell</span>");
        updateOdds();
    }
}

function swapPolarity() {
    let currentLives = liveInput.value;
    let currentBlanks = blankInput.value;

    if (Number(currentBlanks) > 0 || Number(currentLives) > 0) {
        liveInput.value = currentBlanks;
        blankInput.value = currentLives;

        addToLog("<span style='color: #1fd219;'>Used Reverse Polarity</span>");
        updateOdds();
    }
}

fireLive.addEventListener('click', shootLive);
fireBlank.addEventListener('click', shootBlank);
reverse.addEventListener('click', swapPolarity);