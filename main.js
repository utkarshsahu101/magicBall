let qaHeading = document.getElementById('qaHeading');
let qaForm = document.getElementById('qaForm');
let form = document.getElementById('form');
let userName = document.getElementById('userName');
let afterQuitMessage = document.getElementById('afterQuitMessage');
let modalContainer = document.getElementById('modalContainer');

let QUESTIONS_ARRAY = ["Should I go to party?", "Should I start learning JS?", "Will I watch movie?", "Will I achieve good health?", "Will I improve my coding style?", "Will I optimize my codebase?", "Will I write HTML And CSS using JS?", "Am I able to read my code after somedays"];

const ANSWERS_ARRAY = ['It is certain', 'It is decidedly so','Reply hazy try again', 'Cannot predict now', 'Do not count on it', 'My sources say no', 'Outlook not so good', 'Signs point to yes'];

qaHeading.addEventListener("click", function() {
    form.style.display = "block";
});

function printQuestionAnswer(){
    let randomNumberGeneratedQuestion = Math.floor(Math.random() * QUESTIONS_ARRAY.length);
    let questionAnswer = [QUESTIONS_ARRAY[randomNumberGeneratedQuestion], ANSWERS_ARRAY[randomNumberGeneratedQuestion]];
    // remove question from array if it appeared once
    QUESTIONS_ARRAY.splice(randomNumberGeneratedQuestion, 1);
    return questionAnswer;
}

function checkInput(value) {
    let checkVar = userName.value.charCodeAt(userName.value.length-1);
    if((checkVar < 97 || checkVar > 122) && (checkVar < 65 || checkVar > 90) && checkVar!==' '.charCodeAt(0)) {
        userName.value = value.slice(0, -1);
    } 
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let h1 = document.createElement("h1");
    h1.innerHTML = (userName.value !== "") ? ("Hello, " + userName.value + "!") : "Hello!";
    h1.className = 'messageClass';
    qaForm.insertBefore(h1, form.nextSibling);
    form.style.display = "none";
    qaHeading.style.display = "none";

    let nextQuestionButton = document.createElement('button');
    nextQuestionButton.innerHTML = "Next Question";
    let quitButton = document.createElement('button')
    quitButton.innerHTML = "Quit";
    nextQuestionButton.className = "qaButton";
    quitButton.className = "qaButton";
    qaForm.insertBefore(nextQuestionButton, h1.nextSibling);
    qaForm.insertBefore(quitButton, h1.nextSibling);

    let qaMessage = document.createElement('div');
    let testVar = printQuestionAnswer();

    let question = testVar[0];
    let answer = testVar[1];
    let questionShow = document.createElement('h2');
    questionShow.innerHTML = question;
    questionShow.className = "questionShow";
    qaMessage.appendChild(questionShow);
    let answerShow = document.createElement('H4');
    answerShow.innerHTML = "- " + answer;
    answerShow.className = "answerShow";
    qaMessage.appendChild(answerShow);

    h1.insertAdjacentElement('afterend', qaMessage);

    function gameOverAsArrayIsBlank() {
        let lastView = document.createElement('div');
        lastView.innerHTML = "Thank You" + userName.value;
        afterQuitMessage.style.display = "block";
        afterQuitMessage.innerHTML = "Thank You " + userName.value + " for trying your luck.";
        qaForm.style.display = "none";
        modalContainer.style.display = "none";
    }

    function gameOver(){
        modalContainer.style.display = "block";
        let modalConfirmExitClose = document.getElementById('modalConfirmExitClose');
        modalConfirmExitClose.addEventListener("click", () => {
            qaForm.style.display = "block";
            modalContainer.style.display = "none";
        });
        let submitModalContainer = document.getElementById('submitModalContainer');
        submitModalContainer.addEventListener('click', gameOverAsArrayIsBlank);
    }

    quitButton.addEventListener('click', gameOver);
    nextQuestionButton.addEventListener('click', () => {
        if(QUESTIONS_ARRAY.length == 0) {
            gameOverAsArrayIsBlank();
        } else {
            let testVar = printQuestionAnswer();
            let question = testVar[0];
            let answer = testVar[1];
            if(document.querySelector('.questionShow') || document.querySelector('.answerShow')) {
                qaMessage.removeChild(document.querySelector('.questionShow'))
                qaMessage.removeChild(document.querySelector('.answerShow'))
            }
            let questionShow = document.createElement('h2');
            let answerShow = document.createElement('H4');
            questionShow.innerHTML = question;
            questionShow.className = "questionShow";
            qaMessage.appendChild(questionShow);
            answerShow.innerHTML = "- " + answer;
            answerShow.className = "answerShow";
            qaMessage.appendChild(answerShow);
            modalContainer.style.display = "none";
        }
    });
})
