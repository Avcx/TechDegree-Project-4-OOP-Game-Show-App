/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const overlay = document.querySelector('#overlay');

const keyboard = document.querySelector('#qwerty');
const hearts = document.querySelectorAll('.tries')
let game = new Game();

document.querySelector('#btn__reset').addEventListener('click', e => {
    game.startGame();
})

// Event listener for when a button on the onScreen keyboard is clicked

keyboard.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && game.activePhrase !== null && game.ready) {
        game.handleInteraction(e);
    }
});

// Event listener for when a key on the keyboard is pressed

document.addEventListener('keyup', e => {
    if (/^[a-z]$/.test(e.key) && game.activePhrase !== null && game.ready) {
        game.handleInteraction(e);
    }
})