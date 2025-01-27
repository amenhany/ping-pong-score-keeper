window.onload = reset;

const playerCount = document.querySelector('#playerCount');
const footer = document.querySelector('.cardFooter');
const winScore = document.querySelector('#winScore');
const scoreboard = document.querySelector('#scoreboard');

let max = 3;
const playerArray = [];

const resetButton = document.createElement('button');
resetButton.classList.add('reset');
resetButton.innerText = 'Reset';
resetButton.addEventListener('click', reset)


playerCount.addEventListener('change', reset)

winScore.addEventListener('change', () => {
    max = winScore.value;
})



function reset() {
    // reset
    footer.innerHTML = '';
    scoreboard.innerHTML = '';
    const previousLength = playerArray.length
    for (let i = 0; i < previousLength; i++)
        playerArray.pop();

    // initialize
    for (let i = 1; i <= playerCount.value; i++) {
        const newButton = document.createElement('button');
        newButton.classList.add('playerButton', `p${i}`);
        newButton.innerText = `+1 Player ${i}`;

        const newSpan = document.createElement('span');
        newSpan.classList.add(`score${i}`);
        newSpan.innerText = '0';

        scoreboard.append(newSpan);
        if (i >= 1 && i < playerCount.value) scoreboard.innerHTML += ' : ';

        newButton.addEventListener('click', button(i - 1));
        footer.append(newButton);
    }

    footer.append(resetButton);

    for (let i = 1; i <= playerCount.value; i++) {
        const player = {
            score: 0,
            button: document.querySelector(`.p${i}`),
            display: document.querySelector(`.score${i}`)
        }
        playerArray.push(player);
    }
}

const button = (playerIndex) => (
    function () {
        const player = playerArray[playerIndex];
        const others = playerArray.toSpliced(playerIndex, 1);

        player.display.innerText = ++player.score;

        if (player.score >= max && onTwo(player, others))
            endGame(player, others);
    }
)

function endGame(winner, losers) {
    winner.display.classList.add('winner');
    winner.button.disabled = true;
    for (loser of losers) {
        loser.display.classList.add('loser');
        loser.button.disabled = true;
    }
}

const onTwo = (player, others) => {
    for (other of others)
        if ((player.score - other.score) <= 1) return false;

    return true;
}