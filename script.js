const liveInput = document.getElementById('live-input');
const blankInput = document.getElementById('blank-input');
const livePercentText = document.getElementById('live-percent');
const blankPercentText = document.getElementById('blank-percent');
const fireLive = document.getElementById('fire-live');
const fireBlank = document.getElementById('fire-blank');
const reverse = document.getElementById('reverse');
const clearRnd = document.getElementById('clear-round');
const moveLog = document.getElementById('move-log');
const phoneInput = document.getElementById('phone-input');
const phoneLive = document.getElementById('phone-live');
const phoneBlank = document.getElementById('phone-blank');
let hintedType = "";
let bulletsUntilHint = 0;

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

    hintedType = "";
    bulletsUntilHint = 0;

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
        liveInput.value = currentLives - 1;

        let hintText = getHintSuffix(); // Ask the helper function for the countdown text
        addToLog(`<span style='color: #ff5252;'>Fired LIVE shell</span>${hintText}`);

        updateOdds();
    }
}

function shootBlank() {
    let currentBlanks = Number(blankInput.value) || 0;
    if (currentBlanks > 0) {
        blankInput.value = currentBlanks - 1;

        let hintText = getHintSuffix(); // Ask the helper function for the countdown text
        addToLog(`<span style='color: #1976d2;'>Fired BLANK shell</span>${hintText}`);

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
    if (bulletsUntilHint > 0) {
        if (hintedType === "LIVE") {
            hintedType = "BLANK";
        } else if (hintedType === "BLANK") {
            hintedType = "LIVE";
        }
    }
}

fireLive.addEventListener('click', shootLive);
fireBlank.addEventListener('click', shootBlank);
reverse.addEventListener('click', swapPolarity);

function logPhoneLive() {
    let bulletNum = Number(phoneInput.value);
    if (bulletNum === 1) {
        hintedType = "LIVE";
        bulletsUntilHint = bulletNum;
        addToLog(`<span style='color: #d8af2c;'>☎️ PHONE: Next bullet is LIVE</span>`);
        phoneInput.value = '';
    } else if (bulletNum > 0) {
        hintedType = "LIVE";
        bulletsUntilHint = bulletNum;
        addToLog(`<span style='color: #d8af2c;'>☎️ PHONE: Bullet ${bulletNum} is LIVE</span>`);
        phoneInput.value = '';
    }
}

function logPhoneBlank() {
    let bulletNum = Number(phoneInput.value);
    if (bulletNum === 1) {
        hintedType = "BLANK";
        bulletsUntilHint = bulletNum;
        addToLog(`<span style='color: #d8af2c;'>☎️ PHONE: Next bullet is BLANK</span>`);
        phoneInput.value = '';
    } else if (bulletNum > 0) {
        hintedType = "BLANK";
        bulletsUntilHint = bulletNum;
        addToLog(`<span style='color: #d8af2c;'>☎️ PHONE: Bullet ${bulletNum} is BLANK</span>`);
        phoneInput.value = '';
    }
}

phoneLive.addEventListener('click', logPhoneLive);
phoneBlank.addEventListener('click', logPhoneBlank);

function getHintSuffix() {
    if (bulletsUntilHint > 0) {
        bulletsUntilHint--;

        if (bulletsUntilHint > 1) {
            return ` <span style='color: #d8af2c;'>- ${hintedType.toLowerCase()} in ${bulletsUntilHint}!</span>`;
        } else if (bulletsUntilHint === 1) {
            return ` <span style='color: #d8af2c;'>- next is ${hintedType}</span>`;
        } else if (bulletsUntilHint === 0) {
            hintedType = "";
            return "";
        }
    }
    return "";
}