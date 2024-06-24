const targetWord = "אהובה"; // המילה שיש לנחש
const maxAttempts = 6;
let currentAttempt = 0;

const wordGrid = document.getElementById('word-grid');
const wordInput = document.getElementById('word-input');
const submitBtn = document.getElementById('submit-btn');
const messageElement = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

// Initialize the grid
for (let i = 0; i < maxAttempts * 5; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    wordGrid.appendChild(tile);
}

submitBtn.addEventListener('click', submitGuess);
wordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitGuess();
    }
});

restartBtn.addEventListener('click', () => {
    window.location.reload();
});

function submitGuess() {
    const guess = wordInput.value.trim();
    if (guess.length !== 5) {
        showMessage('יש להזין מילה בת 5 אותיות.');
        return;
    }
    
    if (currentAttempt >= maxAttempts) {
        return;
    }
    
    const tiles = wordGrid.querySelectorAll('.tile');
    for (let i = 0; i < 5; i++) {
        const tile = tiles[currentAttempt * 5 + i];
        tile.textContent = guess[i];
        
        if (guess[i] === targetWord[i]) {
            tile.classList.add('correct');
        } else if (targetWord.includes(guess[i])) {
            tile.classList.add('present');
        } else {
            tile.classList.add('absent');
        }
    }

    if (guess === targetWord) {
        showMessage('כל הכבוד! ניחשת נכון!', true);
        return;
    }

    currentAttempt++;
    wordInput.value = '';

    if (currentAttempt >= maxAttempts) {
        showMessage(`הפסדת! המילה הייתה: ${targetWord}`, true);
    }
}

function showMessage(message, end = false) {
    messageElement.textContent = message;
    if (end) {
        submitBtn.disabled = true;
        wordInput.disabled = true;
        restartBtn.style.display = 'block';
    }
}
