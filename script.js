
const questions = [
  {
    question: 'What is meant by the principle of "presumption of innocence" in law?',
    answers: [
      { text: 'The defendant is considered guilty until proven innocent', correct: true },
      { text: 'The defendant is considered guilty without evidence', correct: false },
      { text: 'The judge has a presumption against the defendant', correct: false },
      { text: 'The judge has absolute authority to assess guilt or innocence', correct: false },
    ]
  },
  {
    question: 'What is the main purpose of criminal law?',
    answers: [
      { text: 'Settling disputes between conflicting parties', correct: false },
      { text: 'Punishing the perpetrator of a crime', correct: false },
      { text: 'Providing compensation to the victim', correct: false },
      { text: 'Maintaining public order and justice', correct: true },
    ]
  },
  {
    question: 'What is the difference between civil law and criminal law?',
    answers: [
      { text: 'Civil law regulates criminal actions, while criminal law regulates civil actions', correct: false },
      { text: 'Civil law governs relationships between individuals, while criminal law governs relationships between individuals and the state', correct: true },
      { text: 'Both are only different in terminology, actually having the same function', correct: false },
      { text: 'Civil law only applies to companies, while criminal law applies to individuals', correct: false },
    ]
  },
  {
    question: 'What is meant by "international law"?',
    answers: [
      { text: 'Law that applies only in one country', correct: false },
      { text: 'Law that regulates relations between countries', correct: true },
      { text: 'Law that applies worldwide', correct: false },
      { text: 'Law that only applies at the local level', correct: false },
    ]
  },
  {
    question: 'What is the function of a judge in the judicial system?',
    answers: [
      { text: 'Drafting new laws', correct: false },
      { text: 'Investigating criminal cases', correct: false },
      { text: 'Imposing punishment on the defendant', correct: false },
      { text: 'Upholding the law and delivering fair decisions', correct: true },
    ]
  }
];

const questionElement = document.querySelector('.question');
const answerButton = document.querySelector('.answer-btns');
const nextButton = document.querySelector('.next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while(answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }

  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block'
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = 'Let quiz again?';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();

