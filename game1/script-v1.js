'use strict';

const myInfo = function() {
    swal("Non-Responsive Webpage", "Hello User, Currently website is not responsive. Thus it is recommended not to play the game from your mobile for better experience!.", "warning");
}

// Secret Number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(secretNumber);
// Score Variable
let theScore = 20;

// Highscore
let highScore = 0;

let check = document.querySelector('.check');
let again = document.querySelector('.again');


const checkOnClick = function() {

    const guess = document.querySelector('.guess');
    const guessedValue = Number(guess.value);
    const message = document.querySelector('.message');

    if (guessedValue) {
        // Truthy Value
        console.log(`Guessed Value: ${guessedValue}`);
        const score = document.querySelector('.score');

        // Game Won!
        if (guessedValue === secretNumber) {
            // alert('You Guessed it!!');
            message.textContent = 'You guessed the number!!';
            const number = document.querySelector('.number');
            number.textContent = guessedValue;
            // document.querySelector('body').style.backgroundColor = '#green';
            document.querySelector('body').style.backgroundColor = 'green';
            document.querySelector('.number').style.width = '30rem';

            if (theScore > highScore) {
                highScore = theScore;
                document.querySelector('.highscore').textContent = highScore;
            }
        } else if (guessedValue > secretNumber) {
            message.textContent = 'Too High!!';
            theScore -= 1;
            score.textContent = theScore;
        } else {
            message.textContent = 'Too Low!!';
            theScore -= 1;
            score.textContent = theScore;
        }
    } else console.log('Please enter a valid number between 1 and 20'); // Falsy value

    if (theScore == 0) {
        alert('Game Over!');
        message.textContent = 'Game Over!'
            // Disable the button on game over. Else score goes negative.
        document.querySelector('.check').disabled = true;
        document.querySelector('body').style.backgroundColor = 'red';

        // displaySecretNumber();
        const number = document.querySelector('.number');
        number.style.width = '300px';
        number.textContent = secretNumber;
    }
};

const againOnClick = function() {
    // Clear the number input field
    const guess = document.querySelector('.guess');
    guess.value = '';

    // Clear Console
    console.clear();

    // New Random Number
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    // console.log(secretNumber);

    // Reset Score
    const score = document.querySelector('.score');
    theScore = 20;
    score.textContent = theScore;

    // Enable the button if disabled
    const check = document.querySelector('.check');
    if (check.disabled) {
        check.disabled = false;
    }

    // Change backgroundColor to black
    document.querySelector('body').style.backgroundColor = '#222';

    // Display initial message
    const message = document.querySelector('.message');
    message.textContent = 'Start guessing...'

    // Set number back to ?
    const number = document.querySelector('.number');
    number.textContent = '?';
    number.style.width = '15rem';

};

check.addEventListener('click', checkOnClick);
again.addEventListener('click', againOnClick);
