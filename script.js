let timer;
let timeLeft = 60;
let correct = 0;
let wrong = 0;
let currentLevelWords = [];

const words = {
  easy: [
    {eng:"cat", ukr:"кіт"}, {eng:"dog", ukr:"собака"}, {eng:"sun", ukr:"сонце"},
    {eng:"moon", ukr:"місяць"}, {eng:"book", ukr:"книга"}, {eng:"pen", ukr:"ручка"},
    {eng:"water", ukr:"вода"}, {eng:"fire", ukr:"вогонь"}, {eng:"tree", ukr:"дерево"},
    {eng:"house", ukr:"будинок"}
  ],
  medium: [
    {eng:"table", ukr:"стіл"}, {eng:"window", ukr:"вікно"}, {eng:"chair", ukr:"стілець"},
    {eng:"street", ukr:"вулиця"}, {eng:"school", ukr:"школа"}, {eng:"river", ukr:"річка"},
    {eng:"mountain", ukr:"гора"}, {eng:"flower", ukr:"квітка"}, {eng:"forest", ukr:"ліс"},
    {eng:"family", ukr:"сім’я"}
  ],
  hard: [
    {eng:"opportunity", ukr:"можливість"}, {eng:"knowledge", ukr:"знання"},
    {eng:"adventure", ukr:"пригодa"}, {eng:"imagination", ukr:"уява"},
    {eng:"development", ukr:"розвиток"}, {eng:"relationship", ukr:"стосунки"},
    {eng:"achievement", ukr:"досягнення"}, {eng:"environment", ukr:"середовище"},
    {eng:"responsibility", ukr:"відповідальність"}, {eng:"communication", ukr:"спілкування"}
  ]
};

function showStartScreen() {
  document.getElementById("startScreen").classList.remove("hidden");
  document.getElementById("statsScreen").classList.add("hidden");
}

function startGame(level) {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("statsScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  correct = 0;
  wrong = 0;
  timeLeft = 60;
  document.getElementById("timer").textContent = timeLeft;

  currentLevelWords = words[level];

  nextQuestion();

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function nextQuestion() {
  const word = currentLevelWords[Math.floor(Math.random() * currentLevelWords.length)];
  const correctAnswer = word.ukr;

  document.getElementById("question").textContent = word.eng;

  let answers = new Set();
  answers.add(correctAnswer);

  // додаємо випадкові варіанти з рівня
  while (answers.size < 5) {
    const randomWord = currentLevelWords[Math.floor(Math.random() * currentLevelWords.length)].ukr;
    answers.add(randomWord);
  }

  const answersArray = Array.from(answers).sort(() => Math.random() - 0.5);
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  answersArray.forEach(ans => {
    const btn = document.createElement("div");
    btn.className = "answer";
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(btn, ans, correctAnswer);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(btn, selected, correctAnswer) {
  if (selected === correctAnswer) {
    btn.classList.add("correct");
    correct++;
  } else {
    btn.classList.add("wrong");
    wrong++;
  }
  setTimeout(nextQuestion, 500);
}

function endGame() {
  clearInterval(timer);
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("statsScreen").classList.remove("hidden");

  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = wrong;
  document.getElementById("accuracy").textContent = ((correct / (correct + wrong)) * 100).toFixed(1);
}
