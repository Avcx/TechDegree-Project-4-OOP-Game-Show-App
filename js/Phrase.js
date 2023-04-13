/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    /**
     * @constructor
     * @param {string} phrase - The words of the phrase
     */

    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    
/**
 * Gets the phrase as an array
 * @returns {array} - Contains individual characters of the phrase
 */

    get phraseToArr() {
        return this.phrase.split('');
    }

/*
 * Gets the ghost of the phrase onto the game board
 */

    addPhraseToDisplay() {
        const phraseUL = document.querySelector('#phrase ul');

        for (let char of this.phraseToArr) {
            let letter = document.createElement('li');
            letter.textContent = char;

            char === ' ' ? letter.setAttribute('class', `space ${char}`) : letter.setAttribute('class', `hide letter ${char}`);

            phraseUL.appendChild(letter);
        }
    }

    /**
     * Checks if a letter is inside of the phrase
     * @param {string} letter - The letter to be checked
     * @returns {boolean} - If the letter is part of the phrase
     */

    checkLetter(letter) {
       return this.phraseToArr.filter( char => char === letter).length !== 0;
    }

    /**
     * Displays a letter if its part of the phrase
     * @param {string} letter - The letter to be displayed
     */

    showMatchedLetter(letter) {

        const matches = document.querySelectorAll(`.${letter}`)

        matches
        .forEach(match => {
            match.classList.remove('hide');
            match.classList.add('show');
        });
    }
}