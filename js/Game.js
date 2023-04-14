/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    /**
     * Creates the game object
     * @property {number} missed - counts number of incorrect answers
     * @property {string} phrases - Holds all the possible game phrases
     * @property {boolean} activePhrase - Holds the active game phrase
     */

    constructor() {
        this.missed = 0;
        this.phrases = ['Riding shotgun', 'If the cap fits','When it rains it pours', 
        'The more the merrier', 'Many hands make light work', 'Its raining cats and dogs', 
        'Easy come easy go', 'Hit the sack', 'Break a leg', 'Costs an arm and a leg', 
        'Jump on the bandwagon', 'Kill two birds with one stone', 'Lets paint the town red'];

        this.activePhrase = null;
        this.previousPhrase = null;
        this.ready = false
    }

    /*
     * Initializes the game
     */

    startGame() {

        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay();
        overlay.style.display = 'none';
        this.ready = true;
    }

    /*
     * Resets the state of the game so it can be played again
     */

    reset() {
        this.missed = 0;
        this.ready = false;
        this.previousPhrase = this.activePhrase.phrase;
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

    /*
     * Sets the phrase to be guessed
     */

    getRandomPhrase() {
        let randomArray;
        console.log('Prev: ' + this.previousPhrase);
        do {
        randomArray = Math.floor(Math.random() * this.phrases.length)
        console.log('New phrase...')
        } while (this.phrases[randomArray].toLowerCase() === this.previousPhrase)
        console.log('New: ' + this.phrases[randomArray].toLowerCase())
        return new Phrase(this.phrases[randomArray]);
    }

    /**
     * Handles user inputs
     * @param {event} e - The event
     */

    handleInteraction(e) {
        let button = e.target;
        if (e.key) {
            document.querySelectorAll('.key')
                            .forEach(key => {
                                if (key.textContent === e.key) {
                                    button = key;
                                }
                            });
        }

           if (!button.getAttribute('disabled')) {
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
        
    }

    /*
     * Removes a heart from the on-screen life bar
     */

    removeLife() {

        this.missed += 1;

        hearts[5-this.missed].querySelector('img').setAttribute('src', 'images/lostHeart.png')

        if (this.missed === 5) {
            this.gameOver(false);
        }

    }
    /*
     * Checks if all the letters of the phrase have been guessed
    */

    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        const lettersMatch = [];
        for (let letter of letters) {
            if (letter.classList.contains('show')) {
                lettersMatch.push(letter);
            }
        };
        if (letters.length === lettersMatch.length) { 
            this.ready=false;
            setTimeout(this.gameOver, 1250, true, this);
        }
    }

    /**
     * Displays a gameover screen and message depending on whether the player won or lost
     * @param {boolean} playerWon - Is used decide which game over screen to display
     */

    gameOver(playerWon, game = this) {

        overlay.style.display = '';
        const message = overlay.querySelector('h1');

        if (playerWon) {
            overlay.className = 'win';
            message.textContent = 'You Won! Congrats';
            game.reset();
        } else {
            overlay.className = 'lose';
            message.textContent = 'You Lost! Try again!';
            game.reset();
        }
    }
}
