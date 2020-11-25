'use strict';

// Get all references of HTML nodes
const check = document.querySelector('.check');
const again = document.querySelector('.again');
const guess = document.querySelector('.guess');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const number = document.querySelector('.number');
const body = document.querySelector('body');
const highscore = document.querySelector('.highscore');


const myInfo = function() {
    swal("Non-Responsive Webpage", "Hello User, Currently website is not responsive. Thus it is recommended not to play the game from your mobile for better experience!.", "warning");
}

const updateDOM = function(domEle, text) {
    domEle.textContent = text;
}

/**
 *      State variables - score, highScore, secretNumber
 *      
 */

// Secret Number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(secretNumber);

// Score Variable
let theScore = 20;

// Highscore
let highScore = 0;

const checkOnClick = function() {

    const guessedValue = Number(guess.value);

    if (guessedValue) {
        // if Truthy Value
        console.log(`Guessed Value: ${guessedValue}`);

        // Game Won!
        if (guessedValue === secretNumber) {
            // alert('You Guessed it!!');
            updateDOM(message, 'You guessed the number!!');
            updateDOM(number, guessedValue);
            body.style.backgroundColor = 'green';
            number.style.width = '30rem';

            // Disable check button
            check.disabled = true;

            // Update Highscore
            if (theScore > highScore) {
                highScore = theScore;
                updateDOM(highscore, highScore)
            }
        } else if (guessedValue > secretNumber) {
            updateDOM(message, 'Too High!!')
            theScore -= 1;
            updateDOM(score, theScore);
        } else {
            updateDOM(message, 'Too Low!!')
            theScore -= 1;
            updateDOM(score, theScore);
        }
    } else console.log('Please enter a valid number between 1 and 20'); // Falsy value

    if (theScore == 0) {
        alert('Game Over!');
        updateDOM(message, 'Game Over!');
        // Disable the button on game over. Else score goes negative.
        check.disabled = true;
        body.style.backgroundColor = 'red';

        // displaySecretNumber();
        number.style.width = '300px';
        updateDOM(number, secretNumber);
    }
};

const againOnClick = function() {
    // Clear the number input field
    guess.value = '';

    // Clear Console
    console.clear();

    // New Random Number
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    // console.log(secretNumber);

    // Reset Score
    theScore = 20;
    updateDOM(score, theScore);

    // Enable the button if disabled
    if (check.disabled) {
        check.disabled = false;
    }

    // Change backgroundColor to black
    body.style.backgroundColor = '#222';

    // Display initial message
    updateDOM(message, 'Start guessing...');

    // Set number back to ?
    updateDOM(number, '?');
    number.style.width = '15rem';
};

check.addEventListener('click', checkOnClick);
again.addEventListener('click', againOnClick);
