const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let questions = [];
let currentQuestionIndex = 0;
let selectedOption = null;

async function fetchQuestions() {
  try {
    const response = await fetch("https://gist.githubusercontent.com/sravani-mamidi/ac95766ee7645581d51ac666fab8010c/raw/96ab66adfd1f24c8054d9b9aef69488836a1d60b/questions.json");
    questions = await response.json();
    showQuestion();
  } catch (error) {
    questionEl.textContent = "Failed to load questions.";
    console.error("Error loading quiz:", error);
  }
}

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
 optionsEl.innerHTML = "";

current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => {
      selectedOption = option;
      Array.from(optionsEl.children).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  const current = questions[currentQuestionIndex];
  if (selectedOption === current.answer) {
    alert("Correct!");
  } else {
    alert("wrong! Correct answer: ${answer}");
  }

  currentQuestionIndex++;
  selectedOption = null;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
} else {
    questionEl.textContent = "Quiz finished!";
optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

fetchQuestions();