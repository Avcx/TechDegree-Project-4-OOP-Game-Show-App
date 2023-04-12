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

keyboard.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e)
    }
});