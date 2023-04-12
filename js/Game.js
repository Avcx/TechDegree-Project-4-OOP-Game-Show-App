/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    constructor() {
        this.missed = 0;
        this.phrases = ['Riding shotgun', 'If the cap fits'];
        this.activePhrase = null;
    }

    startGame() {

        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay();
        overlay.style.display = 'none';
    }

    reset() {
        this.missed = 0;
        this.activePhrase = null;
        hearts.forEach(heart => {
            heart.querySelector('img').setAttribute('src', 'images/liveHeart.png')
        })
        document.querySelector('#phrase ul').innerHTML = '';
        keyboard.querySelectorAll('button').forEach(button => {
            button.setAttribute('class', 'key');
            button.removeAttribute('disabled');
        })
    }

    getRandomPhrase() {
        const randomArray = Math.floor(Math.random() * this.phrases.length)
        return new Phrase(this.phrases[randomArray]);
    }

    handleInteraction(e) {
        const button = e.target
        button.setAttribute('disabled', 'true');

        if (this.activePhrase.checkLetter(button.textContent)) {

            this.activePhrase.showMatchedLetter(button.textContent);
            button.classList.add('chosen');
            this.checkForWin();

        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    removeLife() {

        this.missed += 1;

        hearts[5-this.missed].querySelector('img').setAttribute('src', 'images/lostHeart.png')

        if (this.missed === 5) {
            this.gameOver(false)
        }
    }

    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        const lettersMatch = [];
        for (let letter of letters) {
            if (letter.classList.contains('show')) {
                lettersMatch.push(letter);
            }
        };

        letters.length === lettersMatch.length ? this.gameOver(true) : false
    }

    gameOver(playerWon) {

        overlay.style.display = '';
        const message = overlay.querySelector('h1');

        if (playerWon) {
            overlay.className = 'win';
            message.textContent = 'You Won! Congrats';
            this.reset();
        } else {
            overlay.className = 'lose';
            message.textContent = 'You Lost! Try again!';
            this.reset();
        }
    }
}