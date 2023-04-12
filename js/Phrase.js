/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    get phraseToArr() {
        return this.phrase.split('');
    }

    addPhraseToDisplay() {
        const phraseUL = document.querySelector('#phrase ul');

        for (let char of this.phraseToArr) {
            let letter = document.createElement('li');
            letter.textContent = char;

            char === ' ' ? letter.setAttribute('class', `space ${char}`) : letter.setAttribute('class', `hide letter ${char}`);

            phraseUL.appendChild(letter);
        }
    }

    checkLetter(letter) {
        console.log(this.phraseToArr.filter( char => char === letter).length !== 0)
       return this.phraseToArr.filter( char => char === letter).length !== 0;
    }

    showMatchedLetter(letter) {

        const matches = document.querySelectorAll(`.${letter}`)

        matches
        .forEach(match => {
            match.classList.remove('hide');
            match.classList.add('show');
        });
    }
}