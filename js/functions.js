/* hides the customized alert */
function hideCustomAlert() {
    const alert = document.getElementById('endgame-alert');
    alert.style.display = 'none';
}

/* shows a customized alert with title image text sound and button */
function showCustomAlert(title, imageSource, text, buttonContent, buttonColor, soundSource){
    const alert = document.getElementById('endgame-alert');
    const alertTitle = document.getElementById('endgame-title');
    const alertImage = document.getElementById('endgame-image');
    const alertMessage = document.getElementById('endgame-message');
    const alertButton = document.getElementById('endgame-button');
    
    alert.style.display = 'flex';

    alertTitle.textContent = title;
    alertTitle.style.color = buttonColor;
    alertTitle.style.textShadow = `0 0 10px ${buttonColor}`;
    

    if (imageSource){
        alertImage.src = imageSource;
        alertImage.style.display = 'block';
    } else {
        alertImage.style.display = 'none';
    }

    alertMessage.textContent = text;
    
    alertButton.textContent = buttonContent;
    alertButton.style.backgroundColor = buttonColor;
    alertButton.style.boxShadow = `0 0 10px ${buttonColor}`
    
    if(soundSource){
        const audio = new Audio(soundSource);
        audio.play();
    }

    alertButton.addEventListener('click', () => hideCustomAlert());
}

/* generates a random number between min and max (min and max  included)  */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 	GAME LEVEL SELECTION    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* fills empty spaces on the subtitle with the informations about the game level chosen */
function setDifficultyToSubtitle(difficulty, min, max, numberOfAttempts){
    const difficultyPlace = document.getElementById('difficulty');
    const minPlace = document.getElementById('min-number');
    const maxPlace = document.getElementById('max-number');
    const attemptsPlace = document.getElementById('attempts-limit');
    
    difficultyPlace.textContent = difficulty;
    minPlace.textContent = min;
    maxPlace.textContent = max;
    attemptsPlace.textContent = numberOfAttempts;   
}

/* verifies if the button selected has the class active */
function isActive(button) {
    return button.classList.contains('active');
}

/* receives an array with  [dificulty, min, max, numberOfAttempts] */
function levelSelector(){
    const easyButton = document.getElementById('level-easy');
    const mediumButton = document.getElementById('level-medium');
    const hardButton = document.getElementById('level-hard');
    const expertButton = document.getElementById('level-expert');
    const supremeButton = document.getElementById('level-supreme');

    if(isActive(easyButton)){
        const [difficulty, min, max, numberOfAttempts] = ['an easy', 1, 10, 10];
        setDifficultyToSubtitle(difficulty, min, max, numberOfAttempts);
        return [difficulty, min, max, numberOfAttempts];  
    }

    if(isActive(mediumButton)){
        const [difficulty, min, max, numberOfAttempts] = ['a medium', 1, 50, 10];
        setDifficultyToSubtitle(difficulty, min, max, numberOfAttempts);
        return [difficulty, min, max, numberOfAttempts]
    }
    
    if(isActive(hardButton)){
        const [difficulty, min, max, numberOfAttempts] = ['a hard', 1, 100, 7];
        setDifficultyToSubtitle(difficulty, min, max, numberOfAttempts);
        return [difficulty, min, max, numberOfAttempts]
    }

    if(isActive(expertButton)){
        const [difficulty, min, max, numberOfAttempts] = ['an expert', 1, 1000, 7];
        setDifficultyToSubtitle(difficulty, min, max, numberOfAttempts);
        return [difficulty, min, max, numberOfAttempts]
    }

    if(isActive(supremeButton)){
        const min = randomNumber(1,9000);
        const max = min + 1000;
        const difficulty = 'a supreme';
        const numberOfAttempts = 5;
        setDifficultyToSubtitle(difficulty, min, max, numberOfAttempts);
        return [difficulty, min, max, numberOfAttempts]
    } 
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 	GAME ITSELF    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function isANumber(value) {
    if (typeof value === 'number' && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function reset(){
    const inputNumber = document.getElementById('guess');
    inputNumber.value = '';
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
    
    const start = document.getElementById('start');
    start.style.display = 'flex';

    const guessing = document.getElementById('guessing');
    guessing.style.display = 'none';

    level = null;
    attemptsLeft = null;
    secretNumber = null;
}


/* gets the input number value, validadates it, and transforms from a string to a number  */
function getGuessedNumber(min, max){
    const inputNumber = Number(document.getElementById('guess').value);
    
    /* validation */
    if (isANumber(inputNumber)){
        if(inputNumber < min || inputNumber > max){
            alert(`The number must be between ${min} and ${max}`);
            reset();
        } else{
            console.log(`o input é : ${inputNumber} dentro da function getGuessedNumber`);
            return inputNumber;
        }   
    }
    /* as the function returns if isANumber is true, there's no need of else conditional */
    alert('Invalid input, please enter a number');
    reset();
}

/* defines the routine when the player wins the game */
function gameWin(gameDifficulty, rightNumber){
    showCustomAlert('GOT IT !!!', 'src/images/got it.jpg', `You won at the ${gameDifficulty} level, the number was ${rightNumber} !!!!!`, 'PLAY AGAIN', 'var(--neon-green)',false);
    reset();
}

/* chooses a color gradient based on how much is the distance */
function choosecolor(distance){
    if(distance > 500){
        const colorAndShadow = ['var(--red-orange)', 'var(--shadow-for-red-orange)'];
        return colorAndShadow
    }

    if (distance > 100 ){
        const colorAndShadow = ['var(--orange-yellow)', 'var(--shadow-for---orange-yellow)'];
        return colorAndShadow
    } 
    
    if (distance > 50){
        const colorAndShadow = ['var(----yellow-blue)', 'var(--shadow-for-yellow-blue)'];
        return colorAndShadow
    }
    
    if (distance > 10){
        const colorAndShadow = ['var(----blue-cyan)', 'var(--shadow-for-blue-cyan)'];
        return colorAndShadow
    }
    
    if (distance <= 10){
        const colorAndShadow = ['var(--cyan-green)', 'var(--shadow-for-cyan-green)'];
        return colorAndShadow
    }
}

/* defines what will be the feedback  message for the last attempt */
function showFeedbackMessage(feedback, distance, guessedNumber ){
    const resultsList = document.getElementById('results-list');
    const newLi = document.createElement('li');
    newLi.innerHTML = `<p class="result-message"> wrong guess! ${guessedNumber} is ${feedback} the secret number! </p>`;
    
    resultsList.appendChild(newLi);
    /* chooses the color for the text of the attempt */
    const [color, shadow] = choosecolor(distance);
    newLi.style.backgroundImage = color;
    newLi.style.boxShadow = shadow;
}


function gameLost(secretNumber){
    showCustomAlert('YOU LOST', 'src/images/wrong',`you're out of attempts, the secret number was ${secretNumber}.`, 'TRY AGAIN', 'var(--neon-red)', false);
    reset();
}


/* compares the input with the secret number */
function game([difficulty, min, max, attemptsLeft, secretNumber]) {
    const guessedNumber = getGuessedNumber(min, max);
    
    if (secretNumber !== guessedNumber){
        
        if(attemptsLeft === 0){
            gameLost(secretNumber);
            return;
        }

        if (secretNumber > guessedNumber){
            const distance = secretNumber - guessedNumber
            showFeedbackMessage('above', distance, guessedNumber);
        }

        if (secretNumber < guessedNumber){
            const distance = guessedNumber - secretNumber;
            showFeedbackMessage('below', distance, guessedNumber);
        }
        
    } else {
        gameWin(difficulty, secretNumber);
    }

}

