const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '93',
        choice3: '4',
        choice4: '22',
        answer: '3'
    },
    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghi',
        choice4: 'None of the above',
        answer: '1'
    },
    {
        question: 'What percent of American adults believe that chocolate milk comes from brown cows?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        answer: '3'
    },
    {
        question: 'Approximately what percent of U.S power outages are caused by squirrels?',
        choice1: '10-20%',
        choice2: '5-10%',
        choice3: '15-20%',
        choice4: '30-40%',
        answer: '1'
    }
]

const SCORE_POINTS = 100
const MAX_QUESTION = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTION){
        localStorage.setItem('mostRecentScore', score)      //saves final score
        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`   //changes display of bar

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question //displays question at random

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]    //get choices of question above
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false      //makes sure no choices are chosen yet
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'  //matches data-number to answer number above

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)  //changes style to red or green

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)  //after certain amount of time, changes questions
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()