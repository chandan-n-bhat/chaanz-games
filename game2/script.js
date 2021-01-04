'use strict';

const start = () => {
    myInfo();
    initializeGame();
}

const myInfo = function() {
    swal("Non-Responsive Webpage", "Hello User, Currently website is not responsive. Thus it is recommended not to play the game from your mobile for better experience!.", "warning");
    setTimeout(gameRules,10000);
}

const gameRules = () => {
    swal("Game Rules", "A player rolls a dice and scores as many points as the total shown on the dice provided that the dice doesn’t roll a 1. The player may continue rolling and accumulating points (but risk rolling a 1) or end his turn by holding the accumulated score which adds up to the players score. If the player rolls a 1 his turn is over, he loses all points he accumulated that turn, and he passes the dice to the next player. Play passes from player to player until a winner is determined. The first player to accumulate 100 or more points wins the game.", "info");
}


const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score0Ele = document.getElementById('score--0');
const score1Ele = document.getElementById('score--1');
const name0Ele = document.getElementById('name--0');
const name1Ele = document.getElementById('name--1');

const diceEle = document.querySelector('.dice');

const currentScore0Ele = document.getElementById('current--0');
const currentScore1Ele = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

/*
    State Variables
    1. Current Score
    2. Player Scores : Array of length 2
*/

let currentScore = 0;
let turn = 0;
let scores = Array(0, 0);
/*
    Function Definations
*/

const hideDice = function() {
    diceEle.classList.add('hidden');
}

const showDice = function() {
    diceEle.classList.remove('hidden');
}

const updateDOM = function(domEle, message) {
    domEle.textContent = message;
    return;
}

const initializeGame = function() {

    // Show game Rules
    // swal("Game Rules", "A player rolls a dice and scores as many points as the total shown on the dice provided that the dice doesn’t roll a 1. The player may continue rolling and accumulating points (but risk rolling a 1) or end his turn by holding the accumulated score which adds up to the players score. If the player rolls a 1 his turn is over, he loses all points he accumulated that turn, and he passes the dice to the next player. Play passes from player to player until a winner is determined. The first player to accumulate 100 or more points wins the game.", "info");

    // Initialize state variables
    scores = Array(0, 0);
    turn = 0;
    currentScore = 0;

    // Update Player's Names
    const name0 = prompt("Enter player 1 name: ");
    if (name0)
        updateDOM(name0Ele, name0);

    const name1 = prompt("Enter player 2 name: ");
    if (name1)
        updateDOM(name1Ele, name1);

    // Set DOM Scores to Zero
    updateDOM(score0Ele, 0);
    updateDOM(score1Ele, 0);
    updateDOM(currentScore0Ele, 0);
    updateDOM(currentScore0Ele, 0);

    // Hide the Dice
    hideDice();

    // Enable the disabled buttons
    if (btnHold.disabled) {
        btnHold.disabled = false;
        btnRoll.disabled = false;
    }

    // Set Classes
    if (!player0.classList.contains('player--active')) {
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
    }

    // Remove Winner class for winner player
    if (player0.classList.contains('player--winner')) {
        player0.classList.toggle('player--winner');
    }
    if (player1.classList.contains('player--winner')) {
        player1.classList.toggle('player--winner');
    }
}

const rollDice = function() {

    // Make the dice visible
    if (diceEle.classList.contains('hidden'))
        showDice();

    // 1. Generate the random value between 1-6
    const diceVal = Math.trunc((Math.random() * 6)) + 1;
    console.log(diceVal);

    // 2. Display the dice value (dice image)
    diceEle.src = `./dice-${diceVal}.png`;

    // 3. Check for rolled 1
    if (diceVal === 1) {
        // Switch Player
        currentScore = 0;
        if (turn === 0) {
            updateDOM(currentScore0Ele, 0);
        } else {
            updateDOM(currentScore1Ele, 0);
        }

        // Toggle CSS Style
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');

        // Toggle Player
        turn = turn === 0 ? 1 : 0;

    } else {
        // Add dice to current score
        currentScore += diceVal;
        // console.log(currentScore);
        if (turn === 0)
            updateDOM(currentScore0Ele, currentScore);
        else
            updateDOM(currentScore1Ele, currentScore);
    }
}

const holdScore = function() {

    // 1. Add current current score to active player's score
    scores[turn] += currentScore;

    // 2. Set current score to 0
    currentScore = 0;

    // 3. Update the scores to the DOM
    if (turn === 0) {
        updateDOM(score0Ele, scores[turn]);
        updateDOM(currentScore0Ele, currentScore);
    } else {
        updateDOM(score1Ele, scores[turn]);
        updateDOM(currentScore1Ele, currentScore);
    }

    // 4. Check if player is winner
    if (scores[turn] >= 100) {
        // Player with turn is the winner
        if (turn === 0) {
            player0.classList.add('player--winner');
        } else {
            player1.classList.add('player--winner');
        }

        // Disable buttons to prevent the game further
        btnHold.disabled = true;
        btnRoll.disabled = true;

        // Hide Dice
        diceEle.classList.add('hidden');

    } else {
        // Toggle CSS class
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');

        // Switch Player
        turn = turn === 0 ? 1 : 0;
    }
}

btnNew.addEventListener('click', initializeGame);
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
