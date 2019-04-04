const playerNick = document.querySelector('input[name="player"]');
const startGame = document.querySelector('#start-game');
const showResult = document.querySelector('#game-result-button');
const choiseArr = [...document.querySelectorAll('form label')];
const choiseImg = ['/images/papier.png', '/images/scisor.png', '/images/stone.png'];
const welcomeDiv = document.querySelector('.welcome');
const gameDiv = document.querySelector('.game');
const resultDiv = document.querySelector(".game-result");


playerNick.maxLength = 15;
playerNick.value = '';
playerNick.addEventListener('focus', () => playerNick.placeholder = '')
playerNick.addEventListener('blur', () => playerNick.placeholder = 'Enter nickname :)')

let changePlayer = null;
choiseArr.forEach((choise, i) => {
    const img = document.querySelector('.game-main img');
    choise.addEventListener('click', () => {
        changePlayer = choise.control.id;
        img.style.display = 'block';
        img.src = choiseImg[i];
        document.querySelector('.result').style.display = 'none';
    })
})

function randomChangeCpu() {
    return choiseArr[Math.floor(Math.random() * choiseArr.length)].control.id;
}

function showResultGame(newColor, newMessage, player, cpu) {
    document.querySelector('.result').style.display = 'flex';
    document.querySelector('.player-change').textContent = player;
    document.querySelector('.cpu-change').textContent = cpu;
    resultDiv.style.color = newColor;
    resultDiv.textContent = newMessage;
}

function checkResult(e) {
    e.preventDefault();
    const changeCpu = randomChangeCpu();
    if (changePlayer) {
        if (changePlayer === changeCpu) {
            showResultGame('#000', 'Nobody won the tie!', changePlayer, changeCpu);
        } else if ((changePlayer === "paper" && changeCpu === "stone") || (changePlayer === "stone" && changeCpu === "scissor") || (changePlayer === "scissor" && changeCpu === "paper")) {
            showResultGame('#009900', 'Bravo You won!', changePlayer, changeCpu);
        } else {
            showResultGame('#cc0000', 'The computer won', changePlayer, changeCpu);
        }
    } else {
        alert('Make a choice!');
    }
}

startGame.addEventListener('click', () => {
    if (playerNick.value) {
        document.querySelector('.nick').textContent = playerNick.value;
        welcomeDiv.style.display = 'none';
        gameDiv.style.display = 'flex';
    } else {
        alert('Please enter Your nick!');
    }
});

showResult.addEventListener('click', checkResult);