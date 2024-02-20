let wordLetters;
let guessedLetters = [];
let incorrectGuesses = 0;
const betuk = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÖÜÓŐÚŰÍU".split('');
 
function loadWords() {
    fetch('szavak.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomWord = data[randomIndex];
            wordLetters = randomWord.split('');
            guessedLetters = [];
            incorrectGuesses = 0;
            gameEnded = false;
            updateWord();
        });
}
 
function updateWord() {
    document.getElementById('word').innerHTML = '';
    wordLetters.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = guessedLetters.includes(letter) ? letter : '_';
        document.getElementById('word').appendChild(span);
    });
}
 
function guessLetter() {
    const inputField = document.getElementById('input-field');
    const letter = inputField.value.toUpperCase();
    inputField.value = '';
 
    if (letter.length === 1 && letter.match(/[A-Z]/) && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
 
        if (!wordLetters.includes(letter)) {
            incorrectGuesses++;
            updateStickman();
        }
    }
 
    updateWord();
    checkGameStatus();
}
 
function updateStickman() {
    const stickman = document.getElementById('stickman');
    stickman.innerHTML = '';
 
    if (incorrectGuesses === 1) {
        stickman.innerHTML = `
            <div class="head">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
        `;
    } else if (incorrectGuesses === 2) {
        stickman.innerHTML = `
            <div class="head">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
            <div class="body"></div>
 
        `;
    } else if (incorrectGuesses === 3) {
        stickman.innerHTML = `
            <div class="head">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
            <div class="body"></div>
            <div class="left-arm hanging"></div>
            <div class="right-arm hanging"></div>
        `;
    } else if (incorrectGuesses === 4) {
        stickman.innerHTML = `
            <div class="head">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
            <div class="body"></div>
            <div class="left-arm hanging"></div>
            <div class="right-arm hanging"></div>
            <div class="left-leg hanging"></div>
            <div class="right-leg hanging"></div>
        `;
    }
}
 
function checkGameStatus() {
    if (guessedLetters.length === wordLetters.length) {
        gameEnded = true;
        alert('Gratulálok! A szót sikeresen megtaláltad.');
    } else if (incorrectGuesses === 5) {
        gameEnded = true;
        alert('Sajnos vesztettél. A szó: ' + wordLetters.join(''));
    }
}
 
loadWords();