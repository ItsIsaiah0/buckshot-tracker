const liveInput = document.getElementById('live-input');
const blankInput = document.getElementById('blank-input');
const livePercentText = document.getElementById('live-percent');
const blankPercentText = document.getElementById('blank-percent');

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