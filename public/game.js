const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const response = document.getElementById('response');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const multipleChoice = document.getElementById('multipleChoice');
const text = document.getElementById('text');

const settings = JSON.parse(localStorage.getItem("settings")) || {
    "difficulty": "p1",
    "number": "first",
    "shuffled": false,
    "question": "generic" 
};

const drugData = JSON.parse(localStorage.getItem("drugData"));

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableDrugs = [];
let questionIndex = 0;
let currentAnswer = "";

let drugs = [];

switch(settings.number){
    case "first":
        drugs = drugData.slice(0,100);
        break;
    case "second":
        drugs = drugData.slice(101, 200);
        break;
    case "third":
        drugs = drugData.slice(0, 200);
        break;
}

if(settings.difficulty == "p1"){
    text.classList.remove('hidden');
    multipleChoice.classList.add('hidden');
}

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = drugs.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableDrugs = [...drugs];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableDrugs.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('/end.html');
    }
    else if (questionCounter >= 1){
        availableDrugs.splice(questionIndex, 1);
    }
    let option = 0;
    questionCounter++;
    if(settings.shuffled){
        questionIndex = Math.floor(Math.random() * availableDrugs.length); //randomly picks a question
    };
    drug = availableDrugs[questionIndex];
    //console.log(drug.brand, questionIndex);


    //Progress Bar
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`;

    if(settings.difficulty == "p1"){
        if(settings.question == "generic"){
            question.innerText = `What is a brand name for ${drug["generic"]}?`;
        }else{
            question.innerText = `What is a generic name for ${drug["brand"]}?`;
        }

    }else if (settings.difficulty == "p2"){
        if(settings.question == "generic"){
            question.innerText = `What is an indicator for ${drug["generic"]}?`;
        }else{
            question.innerText = `What is an indicator for ${drug["brand"]}?`;
        }
        option = Math.floor(Math.random() * 4)+1;
        currentAnswer = option;
        choices.forEach((choice) => {
            const number = choice.dataset['number'];
            if (number == option) choice.innerText = drug['indication'];
            else{
                while (true) {
                    num = Math.floor(Math.random() * drugData.length);
                    if (drugData[num].indication != drug['indication'] 
                        && JaroWrinker(drugData[num].indication, 
                                        drug['indication']) < 0.6) {
                            choice.innerText = drugData[num].indication;
                            break;
                    };
                }
            }
        });
    }else{
        if(settings.question == "generic"){
            question.innerText = `What is the class and signatura for ${drug["generic"]}?`;
        }else{
            question.innerText = `What is the class and signatura for ${drug["brand"]}?`;
        }
        option = Math.floor(Math.random() * 4)+1;
        currentAnswer = option;
        choices.forEach((choice) => {
            choice.innerText = drug['therapeudic_class'] + " & " + drug["signatura"];
            const number = choice.dataset['number'];
            if (number == option) choice.innerText = drug['therapeudic_class'] + " & " + drug["signatura"];
            else{
                while (true) {
                    num = Math.floor(Math.random() * drugData.length);
                    if (drugData[num].signatura != drug['signatura'] 
                        && JaroWrinker(drugData[num].signatura, 
                                        drug['signatura']) < 0.6) {
                            choice.innerText = drugData[num].therapeudic_class + " & " +  drugData[num].signatura;
                            break;
                    };
                }
            }
        });
    }
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentAnswer ? 'correct' : 'incorrect';
        
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000);
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };


response.addEventListener('keyup', () => {
    submitAnswerBtn.disabled = !response.value;
});

checkAnswer = (e) => {
    e.preventDefault();
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    let classToApply = "incorrect";

    if(settings.question == "generic"){
        //looking for the brand
        answer = availableDrugs[questionIndex].brand.toLowerCase();
        if (answer.includes(response.value.toLowerCase())) {
            classToApply = 'correct';
            incrementScore(CORRECT_BONUS);
            submitAnswerBtn.classList.add(classToApply)
            setTimeout(() =>{
                submitAnswerBtn.classList.remove(classToApply)
                response.value = null;
                response.placeholder="type answer here";
                getNewQuestion();
            }, 1000);
        };
    }else{
        answer = availableDrugs[questionIndex].generic.toLowerCase();
        if (answer.includes(response.value.toLowerCase())) {
            classToApply = 'correct';
            incrementScore(CORRECT_BONUS);
            submitAnswerBtn.classList.add(classToApply)
            setTimeout(() =>{
                submitAnswerBtn.classList.remove(classToApply)
                getNewQuestion();
            }, 1000);
        };
    }
    submitAnswerBtn.classList.add(classToApply)
    setTimeout(() =>{
        submitAnswerBtn.classList.remove(classToApply)
    }, 1000);
};

skipQuestion = (e) =>{
    getNewQuestion();
};

exit = (e) =>{
    return window.location.assign('/');
};

setTimeout(() =>{
    startGame();
}, 800);


JaroWrinker  = (s1, s2) =>{
    var m = 0;

    // Exit early if either are empty.
    if ( s1.length === 0 || s2.length === 0 ) {
        return 0;
    }

    // Exit early if they're an exact match.
    if ( s1 === s2 ) {
        return 1;
    }

    var range     = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1,
        s1Matches = new Array(s1.length),
        s2Matches = new Array(s2.length);

    for ( i = 0; i < s1.length; i++ ) {
        var low  = (i >= range) ? i - range : 0,
            high = (i + range <= s2.length) ? (i + range) : (s2.length - 1);

        for ( j = low; j <= high; j++ ) {
        if ( s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j] ) {
            ++m;
            s1Matches[i] = s2Matches[j] = true;
            break;
        }
        }
    }

    // Exit early if no matches were found.
    if ( m === 0 ) {
        return 0;
    }

    // Count the transpositions.
    var k = n_trans = 0;

    for ( i = 0; i < s1.length; i++ ) {
        if ( s1Matches[i] === true ) {
        for ( j = k; j < s2.length; j++ ) {
            if ( s2Matches[j] === true ) {
            k = j + 1;
            break;
            }
        }

        if ( s1[i] !== s2[j] ) {
            ++n_trans;
        }
        }
    }

    var weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3,
        l      = 0,
        p      = 0.1;

    if ( weight > 0.7 ) {
        while ( s1[l] === s2[l] && l < 4 ) {
        ++l;
        }

        weight = weight + l * p * (1 - weight);
    }

    return weight;
}


// console.log(JaroWrinker("Pain (moderate to severe)", "Moderate to severe pain"));
// outputs .7129

// console.log(JaroWrinker("Levoxyl", "Synthroid|Levoxyl|Levothroid|Unithroid|Tirosint"));
// output: .5734

// console.log(JaroWrinker("hydrochlorothiazide;lisinopril", "lisinopril/hydrochlorothiazide"));
